import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import debug from 'debug';
import { pcoAuthenticated, authApp } from './pco/auth';
import { getProfile } from './pco';
import session from './session';

const d = debug('app:server');
const PORT = 8000;

const { SECRET } = process.env;

const app = express();

app.use(cookieParser(SECRET));
app.use(bodyParser.json());

app.use(session);

app.use('/auth', authApp);

app.get('/profile.json', pcoAuthenticated, async (req, res) => {
  res.json(await getProfile(req.session.pco));
});
app.get('/', (req, res) => res.end('Hello!'));

app.listen(PORT, () => {
  d(`Listening on port ${PORT}`);
});
