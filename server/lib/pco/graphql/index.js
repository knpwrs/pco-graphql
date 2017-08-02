import promiseRouter from 'express-promise-router';
import { graphqlExpress } from 'apollo-server-express';
import schema from './schema';
import makeLoader from '../loader';
import { memoizedPostFactory, memoizedPatchFactory } from '../fetch';
import { pcoAuthenticated } from '../auth';

const app = promiseRouter();

// All requests through the graphql endpoint must be authenticated
app.use(pcoAuthenticated);

app.use(graphqlExpress((req) => {
  const { accessToken } = req.session.pco;
  // Make a new loader for every request
  const loader = makeLoader(accessToken);
  // Also pass along post/patch functions
  const post = memoizedPostFactory(accessToken);
  const patch = memoizedPatchFactory(accessToken);
  return {
    schema,
    context: {
      loader,
      post,
      patch,
    },
  };
}));

export default app;
