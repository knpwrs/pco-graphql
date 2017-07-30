import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import debug from 'debug';
import { authApp } from './pco/auth';
import graphql from './pco/graphql';
import session from './session';
import debugApp from './debug';

const d = debug('app:server');
const PORT = 8000;

const { SECRET } = process.env;

const app = express();

app.use(cookieParser(SECRET));
app.use(bodyParser.json());

app.use(session);

app.use('/auth', authApp);
app.use('/graphql', graphql);
app.use('/debug', debugApp);

app.get('/', (req, res) => res.end('Hello!'));

app.listen(PORT, () => {
  d(`Listening on port ${PORT}`);
});
