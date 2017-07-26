import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import debug from 'debug';
import { getProfile, pcoAuthenticated, authApp } from './auth';

const d = debug('app:server');
const PORT = 8000;

const { SECRET } = process.env;

const app = express();

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

app.use('/auth', authApp);

app.get('/profile.json', pcoAuthenticated, async (req, res) => {
  res.json(await getProfile(req.session.pco));
});
app.get('/', (req, res) => res.end('Hello!'));

app.listen(PORT, () => {
  d(`Listening on port ${PORT}`);
});
