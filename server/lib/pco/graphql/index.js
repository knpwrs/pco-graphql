import promiseRouter from 'express-promise-router';
import { graphqlExpress } from 'apollo-server-express';
import schema from './schema';
import makeLoader from '../loader';
import { pcoAuthenticated } from '../auth';

const app = promiseRouter();

// All requests through the graphql endpoint must be authenticated
app.use(pcoAuthenticated);

app.use(graphqlExpress((req) => {
  // Make a new loader for every request
  const loader = makeLoader(req.session.pco);
  return {
    schema,
    context: {
      loader,
    },
  };
}));

export default app;
