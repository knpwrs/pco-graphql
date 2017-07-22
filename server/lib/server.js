import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';
import debug from 'debug';

const d = debug('app:server');
const PORT = 8000;

const { CALLBACK_URL, SECRET, OAUTH_CLIENT_ID, OAUTH_SECRET } = process.env;

d(`OAUTH_CLIENT_ID: ${OAUTH_CLIENT_ID}`);
d(`OAUTH_SECRET: ${OAUTH_SECRET}`);

const app = express();

passport.use('pco', new OAuth2Strategy({
  authorizationURL: 'https://api.planningcenteronline.com/oauth/authorize',
  tokenURL: 'https://api.planningcenteronline.com/oauth/token',
  clientID: OAUTH_CLIENT_ID,
  clientSecret: OAUTH_SECRET,
  callbackURL: CALLBACK_URL,
}, (accessToken, refreshToken, profile, cb) => {
  d(accessToken);
  d(refreshToken);
  d(profile);
  cb(null, { id: 1 });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => done(null, { id }));

app.use(bodyParser.json());
app.use(session({
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
app.get('/', (req, res) => res.end('Hello!'));

app.listen(PORT, () => {
  d(`Listening on port ${PORT}`);
});