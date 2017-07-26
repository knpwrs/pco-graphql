import express from 'express';
import yuri from 'yuri';
import got from 'got';
import debug from 'debug';
// import { encrypt, decrypt } from './crypto';

const d = debug('app:auth');

const { CALLBACK_URL, /* SECRET, */ OAUTH_CLIENT_ID, OAUTH_SECRET } = process.env;
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

export const pcoAuthenticated = (req, res, next) => {
  if (req.session.pco) {
    next();
  } else {
    next(new Error('Not authenticated with PCO!'));
  }
};

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

authApp.get('/pco', (req, res) => {
  res.redirect(AUTH_URL);
});
authApp.get('/pco/callback', async (req, res, next) => {
  try {
    const { code } = req.query;
    d(`Got code from PCO: ${code}`);
    const { body } = await got.post(TOKEN_URL, {
      form: true,
      json: true,
      body: {
        code,
        grant_type: 'authorization_code',
        client_id: OAUTH_CLIENT_ID,
        client_secret: OAUTH_SECRET,
        redirect_uri: CALLBACK_URL,
      },
    });
    d('Got tokens from PCO');
    req.session.pco = {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
      tokenExpires: Date.now() + (2 * 60 * 60 * 1000), // Two hours
    };
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});
authApp.get('/login', (req, res) => res.redirect('pco'));
authApp.get('/logout', pcoAuthenticated, async (req, res) => {
  // Session methods are non-enumerable and therefore difficult to promisify
  req.session.destroy(() => res.redirect('/'));
  // TODO: Revoke token? I don't see any documented endpoints...
});

