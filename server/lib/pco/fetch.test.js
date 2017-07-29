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

test.afterEach(() => {
  nock.restore();
});

test.serial('should perform basic fetch operations', async (t) => {
  nock(API_BASE)
    .get('/people/v2/me')
    .reply(200, function profileHandler() {
      t.deepEqual(this.req.headers.authorization, ['Bearer 1337']);
      return profile;
    });
  const json = await fetch('1337', profileUrl);
  t.deepEqual(json, profile);
});
