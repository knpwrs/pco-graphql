import test from 'ava';
import nock from 'nock';
import fetch, { UnauthorizedError } from './fetch';
import { me, meUrl, API_BASE } from './endpoints';

const profileEndpoint = me();
const profileUrl = meUrl();
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
