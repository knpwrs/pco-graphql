import express from 'express';
import debug from 'debug';
import yuri from 'yuri';
import { graphiqlExpress } from 'apollo-server-express';
import { pcoAuthenticated } from './pco/auth';
import { API_BASE } from './pco/endpoints';
import fetch, { NotFoundError } from './pco/fetch';

const d = debug('app:debug');

const app = express();

// All requests through the graphql endpoint must be authenticated
app.use(pcoAuthenticated);

app.use('/graphiql', pcoAuthenticated, graphiqlExpress({
  endpointURL: '/graphql',
}));

app.get(/\/api\/(.+)/, pcoAuthenticated, async (req, res, next) => {
  const {
    params: { 0: pathname }, // Params is *not* an array
    query,
    session: { pco: { accessToken } },
  } = req;
  const url = yuri(API_BASE).pathname(pathname).query(query).format();
  d(`GETting ${url}`);
  try {
    res.json(await fetch(accessToken, url));
  } catch (err) {
    d(err);
    next(err);
  }
});

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  const { message } = err;
  d(message);
  if (err instanceof NotFoundError) {
    res.status(404);
  } else {
    res.status(500);
  }
  res.end(message);
});
/* eslint-enable no-unused-vars */

export default app;
