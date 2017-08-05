import DataLoader from 'dataloader';
import debug from 'debug';
import fetch from './fetch';

const d = debug('app:loader');

/**
 * Given an object with an `accessToken` property, returns a new `DataLoader`
 * to load PCO URLs.
 *
 * @param {object} pco The PCO session object.
 * @param {string} pco.accessToken The PCO access token.
 * @returns {DataLoader} A DataLoader object for loading PCO URLs.
 */
const makeLoader = (accessToken, trim = true) => new DataLoader(async ([url]) => {
  d(`Loading ${url}`);
  let data = await fetch(accessToken, url);
  if (trim) {
    data = data.data;
  }
  d(`Resolving ${url}`);
  return [data];
}, {
  // The PCO REST API doesn't support batching anyway, but the API for
  // DataLoader doesn't change if you turn it off, i.e., we are still passed an
  // array, but only of one key. That said, it is marginally easier to load
  // without batching and it's the same amount of work anyway given no support
  // for batching on the APi server.
  batch: false,
});

export default makeLoader;
