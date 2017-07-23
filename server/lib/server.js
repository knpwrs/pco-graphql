import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import passport from 'passport';
import debug from 'debug';
import PcoStrategy from './pco-strategy';
import { encrypt, decrypt } from './crypto';

const d = debug('app:server');
const PORT = 8000;

const { CALLBACK_URL, SECRET, OAUTH_CLIENT_ID, OAUTH_SECRET } = process.env;

d(`OAUTH_CLIENT_ID: ${OAUTH_CLIENT_ID}`);
d(`OAUTH_SECRET: ${OAUTH_SECRET}`);

const app = express();

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

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.use(cookieParser(SECRET));
app.use(bodyParser.json());

const RedisStore = connectRedis(session);

app.use(session({
  store: new RedisStore({
    host: 'redis',
  }),
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  secure: app.get('env') === 'production',
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/pco', passport.authenticate('pco'));
app.get('/auth/pco/callback', passport.authenticate('pco', {
  successRedirect: '/',
  failureRedirect: '/login',
}));
app.get('/login', (req, res) => res.redirect('/auth/pco'));
app.get('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/');
});
app.get('/profile.json', isAuthenticated, ({ user }, res) => res.json(user.profile));
app.get('/', (req, res) => res.end('Hello!'));

app.listen(PORT, () => {
  d(`Listening on port ${PORT}`);
});
