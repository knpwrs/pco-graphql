import promiseRouter from 'express-promise-router';
import { graphqlExpress } from 'apollo-server-express';
import schema from './schema';
import makeLoader from '../loader';
import fetchFactory from '../fetch';
import { pcoAuthenticated } from '../auth';

const app = promiseRouter();

// All requests through the graphql endpoint must be authenticated
app.use(pcoAuthenticated);

app.use(graphqlExpress((req) => {
  const { accessToken } = req.session.pco;
  // Make a new loader for every request
  const loader = makeLoader(accessToken);
  // Also pass along a fetch function
  const fetch = fetchFactory(accessToken);
  return {
    schema,
    context: {
      loader,
      fetch,
    },
  };
}));

export default app;
