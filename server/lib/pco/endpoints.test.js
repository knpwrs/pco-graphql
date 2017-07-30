import test from 'ava';
import {
  API_BASE,
  me, meUrl,
  person, personUrl,
} from './endpoints';

test('should generate path for me', (t) => {
  t.is(me(), '/people/v2/me');
});

test('should generate url for me', (t) => {
  t.is(meUrl(), `${API_BASE}/people/v2/me`);
});

test('should generate path for person', (t) => {
  t.is(person('1337'), '/people/v2/people/1337');
});

test('should generate url for person', (t) => {
  t.is(personUrl('1337'), `${API_BASE}/people/v2/people/1337`);
});
