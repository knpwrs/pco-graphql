import test from 'ava';
import nock from 'nock';
import makeLoader from './loader';
import { API_BASE } from './api';

const profileEndpoint = '/people/v2/me';
const profileUrl = API_BASE + profileEndpoint;
const profileResponse = {
  data: {
    type: 'Person',
    id: '1337',
    attributes: {},
  },
};

test('should perform basic fetch operations', async (t) => {
  nock.disableNetConnect();
  const api = nock(API_BASE)
    .get(profileEndpoint)
    .reply(200, function profileHandler() {
      t.deepEqual(this.req.headers.authorization, ['Bearer 1337']);
      return profileResponse;
    });
  const loader = makeLoader({ accessToken: '1337' });
  const [res1, res2] = [loader.load(profileUrl), loader.load(profileUrl)];
  t.is(res1, res2, 'Loading the same url should return the same promise.');
  const data = await res1;
  t.deepEqual(data, profileResponse.data);
  nock.cleanAll();
  api.done();
});
