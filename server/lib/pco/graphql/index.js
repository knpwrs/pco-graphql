import promiseRouter from 'express-promise-router';
import { graphqlExpress } from 'apollo-server-express';
import schema from './schema';
import makeLoader from '../loader';
import { memoizedPostFactory, memoizedPatchFactory, memoizedDeleteFactory } from '../fetch';
import { pcoAuthenticated } from '../auth';

const app = promiseRouter();

// All requests through the graphql endpoint must be authenticated
app.use(pcoAuthenticated);

app.use(graphqlExpress((req) => {
  const { accessToken } = req.session.pco;
  // Make new loaders for every request
  const loader = makeLoader(accessToken);
  const rawLoader = makeLoader(accessToken, false);
  // Also pass along post/patch functions
  const post = memoizedPostFactory(accessToken);
  const patch = memoizedPatchFactory(accessToken);
  const del = memoizedDeleteFactory(accessToken);
  return {
    schema,
    context: {
      loader,
      rawLoader,
      post,
      patch,
      del,
    },
  };
}));

export default app;
