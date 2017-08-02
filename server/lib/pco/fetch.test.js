import test from 'ava';
import nock from 'nock';
import fetch, { UnauthorizedError, NotFoundError } from './fetch';
import { API_BASE } from './api';

const profileEndpoint = '/people/v2/me';
const profileUrl = `${API_BASE}${profileEndpoint}`;
const profile = {
  data: {
    type: 'Person',
    id: '1337',
    attributes: {},
  },
};

let api = null;

test.beforeEach(() => {
  nock.disableNetConnect();
  api = nock(API_BASE);
});

test.afterEach(() => {
  nock.cleanAll();
  api.done();
});

const mockProfile = (t) => {
  api
    .get(profileEndpoint)
    .reply(200, function profileHandler() {
      t.deepEqual(this.req.headers.authorization, ['Bearer 1337']);
      return profile;
    });
};

test.serial('should perform basic fetch operations', async (t) => {
  mockProfile(t);
  const json = await fetch('1337', profileUrl);
  t.deepEqual(json, profile);
});

test.serial('should curry fetch operations', async (t) => {
  mockProfile(t);
  const json = await fetch('1337')(profileUrl);
  t.deepEqual(json, profile);
});

test.serial('should throw when unauthorized', async (t) => {
  api.get(profileEndpoint).reply(401);
  await t.throws(fetch('1337', profileUrl), UnauthorizedError);
});

test.serial('should throw when not found', async (t) => {
  api.get(profileEndpoint).reply(404);
  await t.throws(fetch('1337', profileUrl), NotFoundError);
});

test.serial('should retry when throttled', async (t) => {
  api.get(profileEndpoint).times(1).reply(429, '', {
    'Retry-After': '2',
  });
  mockProfile(t);
  const start = Date.now();
  const json = await fetch('1337')(profileUrl);
  const end = Date.now();
  t.true(end - start >= 2000);
  t.deepEqual(json, profile);
});

test.serial('should allow additional options', async (t) => {
  api.post(profileEndpoint).reply(200, function profileHandler() {
    t.deepEqual(this.req.headers.authorization, ['Bearer 1337']);
    t.deepEqual(this.req.headers['x-special'], ['FooBanana']);
    return { success: true };
  });
  await fetch('1337', profileUrl, {
    method: 'POST',
    headers: {
      'X-Special': 'FooBanana',
    },
  });
});
