import express from 'express';
import yuri from 'yuri';
import got from 'got';
import debug from 'debug';

const d = debug('app:auth');

const { CALLBACK_URL, OAUTH_CLIENT_ID, OAUTH_SECRET } = process.env;
const API_BASE = 'https://api.planningcenteronline.com/';
const AUTH_URL = yuri(API_BASE)
  .pathname('oauth/authorize')
  .query({
    client_id: OAUTH_CLIENT_ID,
    redirect_uri: CALLBACK_URL,
    response_type: 'code',
    scope: 'people services',
  })
  .format();
const TOKEN_URL = yuri(API_BASE)
  .pathname('oauth/token')
  .format();
const REFRESH_THRESHOLD = 5 * 60 * 1000; // Five minutes

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
  const { body } = await got.post(TOKEN_URL, {
    form: true,
    json: true,
    body: {
      [codeField]: code,
      grant_type: grantType,
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_SECRET,
      redirect_uri: CALLBACK_URL,
    },
  });
  d('Got token response from PCO.');
  d(body);
  return {
    accessToken: body.access_token,
    refreshToken: body.refresh_token,
    tokenExpires: Date.now() + (body.expires_in * 1000), // Convert expiration to ms
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
 * Perform authenticated HTTP GET.
 *
 * @param {string} url The url to GET.
 * @param {object} pco The pco session object.
 */
export const get = async (url, { accessToken }) => {
  d(`GETting ${url}`);
  const { body } = await got(url, {
    json: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  d(`Resolving ${url}`);
  return body;
};

const profileUrl = yuri(API_BASE).pathname('people/v2/me').format();
export const getProfile = pco => get(profileUrl, pco);

/**
 * Authentication sub-app.
 */
export const authApp = express();

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

