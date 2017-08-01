import promiseRouter from 'express-promise-router';
import qs from 'qs';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import debug from 'debug';
import { API_BASE } from './api';

const d = debug('app:auth');

const { CALLBACK_URL, OAUTH_CLIENT_ID, OAUTH_SECRET } = process.env;
const AUTH_QUERY = qs.stringify({
  client_id: OAUTH_CLIENT_ID,
  redirect_uri: CALLBACK_URL,
  response_type: 'code',
  scope: 'people services',
});
const AUTH_URL = `${API_BASE}/oauth/authorize?${AUTH_QUERY}`;
const TOKEN_URL = `${API_BASE}/oauth/token`;
const REFRESH_THRESHOLD = 5 * 60 * 1000; // Five minutes

/**
 * Given a failed response object returns a new Error object.
 */
const checkResponse = async (res) => {
  if (res.ok) return;
  throw new Error(`Error from PCO API: ${await res.text()}`);
};

/**
 * Determines if tokens need to be refreshed.
 *
 * @param {object} pco The pco session object.
 */
const shouldRefresh = pco => Date.now() > pco.tokenExpires - REFRESH_THRESHOLD;

/**
 * Gets tokens from PCO, supports refreshing tokens by passing a refresh token
 * as the first parameter and 'refresh_token' as the second parameter.
 *
 * @param {string} code The authorization code or refresh token.
 * @param {string} [grantType='authorization_code'] The grant type to use.
 */
const getTokens = async (code, grantType = 'authorization_code') => {
  d(`Getting tokens from PCO via ${grantType}`);
  const codeField = grantType.includes('code') ? 'code' : grantType;
  const body = new URLSearchParams();
  body.append(codeField, code);
  body.append('grant_type', grantType);
  body.append('client_id', OAUTH_CLIENT_ID);
  body.append('client_secret', OAUTH_SECRET);
  body.append('redirect_uri', CALLBACK_URL);
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    body,
  });
  await checkResponse(res);
  d('Got token response from PCO.');
  const json = await res.json();
  d(json);
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
    tokenExpires: Date.now() + (json.expires_in * 1000), // Convert expiration to ms
  };
};

/**
 * Middleware which determines if PCO is currently authenticated and refreshes
 * tokens as required.
 */
export const pcoAuthenticated = async (req, res, next) => {
  if (req.session.pco) {
    d('PCO session active.');
    const { pco } = req.session;
    if (shouldRefresh(pco)) {
      d('Need to refresh PCO tokens.');
      req.session.pco = await getTokens(pco.refreshToken, 'refresh_token');
    }
    next();
  } else {
    d('No active PCO session.');
    next(new Error('Not authenticated with PCO!'));
  }
};

/**
 * Authentication sub-app.
 */
export const authApp = promiseRouter();

// Redirects user to pco authentication page.
authApp.get('/pco', (req, res) => {
  res.redirect(AUTH_URL);
});
// The user gets redirected here after authenticating at PCO.
authApp.get('/pco/callback', async (req, res, next) => {
  try {
    const { code } = req.query;
    d(`Got code from PCO: ${code}`);
    const tokens = await getTokens(code);
    d('Got tokens from PCO');
    d(tokens);
    req.session.pco = tokens;
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});
// Login to the application
authApp.get('/login', (req, res) => res.redirect('pco'));
// Logout from the application
authApp.get('/logout', pcoAuthenticated, async (req, res) => {
  // Session methods are non-enumerable and therefore difficult to promisify
  req.session.destroy(() => res.redirect('/'));
  // TODO: Revoke token? I don't see any documented endpoints...
});

