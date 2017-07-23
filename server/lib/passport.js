import passport from 'passport';
import debug from 'debug';
import { encrypt, decrypt } from './crypto';
import PcoStrategy from './pco-strategy';

const d = debug('app:passport');

const { CALLBACK_URL, SECRET, OAUTH_CLIENT_ID, OAUTH_SECRET } = process.env;

d(`OAUTH_CLIENT_ID: ${OAUTH_CLIENT_ID}`);
d(`OAUTH_SECRET: ${OAUTH_SECRET}`);

passport.use('pco', new PcoStrategy({
  clientID: OAUTH_CLIENT_ID,
  clientSecret: OAUTH_SECRET,
  callbackURL: CALLBACK_URL,
  scope: ['people', 'services'],
}, (accessToken, refreshToken, profile, cb) => {
  cb(null, {
    profile,
    accessToken,
    refreshToken,
  });
}));

// In this case "serialize" and "deserialize" means "encrypt" and "decrypt"
passport.serializeUser(({ accessToken, refreshToken, profile }, done) => {
  d('serializing user');
  const obj = {
    encryptedAccessToken: encrypt(accessToken, SECRET),
    encryptedRefreshToken: encrypt(refreshToken, SECRET),
    profile,
  };
  done(null, obj);
});

passport.deserializeUser(({ encryptedAccessToken, encryptedRefreshToken, profile }, done) => {
  d('deserializing user');
  const user = {
    accessToken: decrypt(encryptedAccessToken, SECRET),
    encryptedRefreshToken: decrypt(encryptedRefreshToken, SECRET),
    profile,
  };
  done(null, user);
});

export default passport;

/**
 * Middleware to protect routes from unauthenticated access.
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};
