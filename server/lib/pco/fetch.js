import { curry, curryN, uncurryN, mergeDeepLeft } from 'ramda';
import throttle from 'p-throttle';
import delay from 'delay';
import mem from 'mem';
import fetch from 'node-fetch';
import debug from 'debug';

const d = debug('app:fetch');

const LIMIT = 100; // 100 requests in...
const INTERVAL = 20 * 1000; // 20 seconds

export class BadRequestError extends Error {
  constructor() {
    super('Bad request.');
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized. Did our token get revoked?');
  }
}

export class NotFoundError extends Error {
  constructor(resource) {
    super(`Resource not found: ${resource}`);
  }
}

/**
 * Given an accessToken and a url, fetches the requested resource. Checks to
 * see if we are being throttled by the API server and waits accordingly. This
 * function is curried so you can pass in the parameters one at a time or all
 * at once.
 *
 * @param {string} accessToken The PCO access token to use for authorization.
 * @param {string} url The resource to fetch.
 * @param {object} ops Optional additional options (see official Fetch API documentation).
 * @returns {Promise} A promise which resolves with the requested resource.
 */
const bareFetch = curryN(2, async (accessToken, url, ops = {}) => {
  let res = { ok: false };
  // Iterations of this loop are not independent of each other
  /* eslint-disable no-await-in-loop */
  const { method } = ops;
  while (!res.ok) {
    d(`${method || 'GET'} ${url}`);
    res = await fetch(url, mergeDeepLeft({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }, ops));
    if (res.status === 400) {
      const err = new BadRequestError();
      d(err);
      d(await res.json());
      throw err;
    }
    if (res.status === 401) {
      const err = new UnauthorizedError();
      d(err);
      throw err;
    }
    if (res.status === 404) {
      const err = new NotFoundError(url);
      d(err);
      throw err;
    }
    if (res.status === 429) {
      const seconds = parseInt(res.headers.get('Retry-After'), 10);
      d(`Rate limit hit, retrying after ${seconds} seconds.`);
      await delay(seconds * 1000);
    }
  }
  /* eslint-enable no-await-in-loop */
  d(`Resolving ${url}`);
  return method === 'DELETE' ? { success: true } : res.json();
});


/**
 * Creates a function which provides throttled access to the PCO API. Each call
 * to this function returns a function for making api requests that is
 * throttled to 100 requests per 20 seconds. Note that the PCO API reserves the
 * right to change the rate limiting as requried, this does not take that into
 * account.
 *
 * @param {string} accessToken The PCO access token to use for authorization.
 * @returns {function} fetch(url) A function which fetches a resource using the
 *   previously provided access token. Throttled to 100 requests per 20 seconds.
 */
const fetchFactory = (accessToken) => {
  d('Creating fetch function.');
  return throttle(bareFetch(accessToken), LIMIT, INTERVAL);
};

/**
 * A memoized version of the above `fetchFactory`. This function is memoized by
 * `accessToken` for 20 seconds, meaning the same throttled function will be
 * used for parallel and subsequent user requests within 20 seconds, retaining
 * the proper throttle for a given user.  Despite this, the function is not
 * memoized across servers (or restarts) because voodoo isn't real. The most
 * straightforward way to work around this in a load balancing scenario is to
 * use sticky sessions. Restarts are more difficult and will require
 * reimplementation.
 *
 * The memoization of this function is based on access token instead of user
 * id. In the scenario where a request is ongoing and another request comes
 * where the user needed to refresh their tokens, the throttle will not be
 * applied. This may also cause requests to fail if there are still requests
 * pending that expect the old token to work. A future implementation can cache
 * on user id instead of access token.
 *
 * @param {string} accessToken The PCO access token to use for authorization.
 * @returns {function} fetch(url) A function which fetches a resource using the
 *   previously provided access token. Throttled to 100 requests per 20 seconds.
 */
const memoizedFetchFactory = mem(fetchFactory, { maxAge: INTERVAL });

/**
 * An uncurried version of the above `memoizedFetchFactory`. This allows
 * clients to call using two straight arguments while retaining all the
 * previous benefits of memoization and throttling. Although this is
 * "uncurried," the function still allows for currying.
 *
 * @param {string} accessToken The PCO access token to use for authorization.
 * @param {string} url The resource to fetch.
 * @returns {Promise} A promise which resolves with the requested resource.
 */
export default uncurryN(2, memoizedFetchFactory);

/**
 * A customized version of the above memeoizedFetchFactory with additional
 * parameters for HTTP method and data to send.
 *
 * @param {string} accessToken The PCO access token to use for authorization.
 * @param {string} url The resource to POST to.
 * @param {object} data The data to post to the given URL.
 */
export const memoizedSendJsonFactory = curry(
  (method, accessToken, url, data) => memoizedFetchFactory(accessToken)(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify({
      data,
    }),
  }),
);

export const memoizedPostFactory = memoizedSendJsonFactory('POST');
export const memoizedPatchFactory = memoizedSendJsonFactory('PATCH');
export const memoizedDeleteFactory = curry(
  (accessToken, url) => memoizedFetchFactory(accessToken)(url, {
    method: 'DELETE',
  }),
);
