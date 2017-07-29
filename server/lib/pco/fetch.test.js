import test from 'ava';
import nock from 'nock';
import fetch from './fetch';
import { API_BASE, profileUrl } from './';

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
});

const mockProfile = (t) => {
  api
    .get('/people/v2/me')
    .reply(200, function profileHandler() {
      t.deepEqual(this.req.headers.authorization, ['Bearer 1337']);
      return profile;
    });
};

test.serial('should perform basic fetch operations', async (t) => {
  mockProfile(t);
  const json = await fetch('1337', profileUrl);
  t.deepEqual(json, profile);
  api.done();
});

test.serial('should curry fetch operations', async (t) => {
  mockProfile(t);
  const json = await fetch('1337')(profileUrl);
  t.deepEqual(json, profile);
  api.done();
});
