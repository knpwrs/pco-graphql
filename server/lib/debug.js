import promiseRouter from 'express-promise-router';
import debug from 'debug';
import qs from 'qs';
import { graphiqlExpress } from 'apollo-server-express';
import { pcoAuthenticated } from './pco/auth';
import { API_BASE } from './pco/api';
import fetch, { NotFoundError } from './pco/fetch';

const d = debug('app:debug');

const app = promiseRouter();

// All requests through the graphql endpoint must be authenticated
app.use(pcoAuthenticated);

app.use('/graphiql', pcoAuthenticated, graphiqlExpress(req => ({
  endpointURL: '/graphql',
  passHeader: `'X-CSRF-Token': '${req.csrfToken()}',`,
})));

app.get(/\/api\/(.+)/, pcoAuthenticated, async (req, res) => {
  const {
    params: { 0: pathname }, // Params is *not* an array
    query,
    session: { pco: { accessToken } },
  } = req;
  const search = qs.stringify(query);
  const url = `${API_BASE}/${pathname}?${search}`;
  d(`GETting ${url}`);
  res.json(await fetch(accessToken, url));
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
