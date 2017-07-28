import throttle from 'p-throttle';
import delay from 'delay';
import mem from 'mem';
import fetch from 'node-fetch';
import debug from 'debug';

const d = debug('app:fetch');

const LIMIT = 100; // 100 requests in...
const INTERVAL = 20 * 1000; // 20 seconds

/**
 * Creates a function which provides throttled access to the PCO API. There are
 * a few safeguards in place to ensure an individual user does not thrash
 * against the API:
 *
 *   1. Each call to this function returns a function for making api requests
 *   that is throttled to 100 requests per 20 seconds.
 *   2. This function itself is memoized for 20 seconds, meaning the same
 *   throttled function will be used for parallel and subsequent user requests
 *   within 20 seconds, retaining the proper throttle for a given user.
 * There are also a few weaknesses to be aware of:
 *   1. The function is not memoized across servers (or restarts) because
 *   voodoo isn't real. The most straightforward way to work around this in a
 *   load balancing scenario is to use sticky sessions. Restarts are more
 *   difficult and will require reimplementation.
 *   2. The memoization of this function is based on access token instead of
 *   user id. In the scenario where a request is ongoing and another request
 *   comes where the user needed to refresh their tokens, the throttle will
 *   not be applied. A future implementation can cache on user id instead of
 *   access token.
 *   3. The PCO API reserves the right to change the rate limiting as requried.
 *
 * A further implementation detail is that the actual function making requests
 * will check the response headers to make sure the API server isn't throttling
 * us. If it is, the request will be retried as appropriate.
 */
export default mem(accessToken => throttle(async (url) => {
  let res = { ok: false };
  // Iterations of this loop are not independent of each other
  /* eslint-disable no-await-in-loop */
  while (!res.ok) {
    d(`GETting ${url}`);
    res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status === 401) {
      d('Unauthorized. Did our token get revoked?');
      throw new Error(await res.json());
    }
    if (res.status === 429) {
      const seconds = res.headers.get('Retry-After');
      d(`Rate limit hit, retrying after ${seconds} seconds.`);
      await delay(seconds * 1000);
    }
  }
  /* eslint-enable no-await-in-loop */
  d(`Resolving ${url}`);
  return res.json();
}, LIMIT, INTERVAL), { maxAge: INTERVAL });
