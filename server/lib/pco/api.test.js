import test from 'ava';
import {
  API_BASE,
  getTypeUrl,
  getResourceUrl,
  getQueryUrl,
} from './api';

const url = endpoint => API_BASE + endpoint;

test('should generate url for types', (t) => {
  t.is(getTypeUrl('people', 'me'), url('/people/v2/me'));
  t.is(getTypeUrl('people', 'people'), url('/people/v2/people'));
  t.is(getTypeUrl('services', 'plans'), url('/services/v2/plans'));
  t.is(getTypeUrl('services', 'songs'), url('/services/v2/songs'));
});

test('should generate urls for resources', (t) => {
  t.is(getResourceUrl('people', 'people', '1337'), url('/people/v2/people/1337'));
  t.is(getResourceUrl('services', 'songs', '1337'), url('/services/v2/songs/1337'));
});

test('should generate urls for queries', (t) => {
  t.is(
    getQueryUrl('people', 'people', { where: { first_name: 'ken' } }),
    url('/people/v2/people?where%5Bfirst_name%5D=ken'),
  );
});
