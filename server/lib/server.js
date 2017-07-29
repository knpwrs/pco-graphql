import yuri from 'yuri';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { graphiqlExpress } from 'apollo-server-express';
import debug from 'debug';
import { pcoAuthenticated, authApp } from './pco/auth';
import graphql from './pco/graphql';
import { API_BASE } from './pco/endpoints';
import fetch from './pco/fetch';
import session from './session';

const d = debug('app:server');
const PORT = 8000;

const { SECRET } = process.env;

const app = express();

app.use(cookieParser(SECRET));
app.use(bodyParser.json());

app.use(session);

app.use('/auth', authApp);
app.use('/graphql', graphql);
// Debug endpoints
app.use('/graphiql', pcoAuthenticated, graphiqlExpress({
  endpointURL: '/graphql',
}));
app.get(/\/api\/(.+)/, pcoAuthenticated, async (req, res) => {
  const {
    params: { 0: pathname }, // Params is *not* an array
    query,
    session: { pco: { accessToken } },
  } = req;
  const url = yuri(API_BASE).pathname(pathname).query(query).format();
  d(`GETting ${url}`);
  res.json(await fetch(accessToken, url));
});
// "Homepage"
app.get('/', (req, res) => res.end('Hello!'));

app.listen(PORT, () => {
  d(`Listening on port ${PORT}`);
});
