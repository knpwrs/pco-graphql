import test from 'ava';
import { makeLinkResolvers, makeAttributeResolvers } from './utils';

test('make link resolvers', async (t) => {
  const names = ['foo', 'bar', 'baz', 'qux'];
  const resolvers = makeLinkResolvers(names);
  const context = {
    loader: {
      load: async key => Promise.resolve(key.toUpperCase()),
    },
  };
  const root = {
    links: {
      foo: 'oof',
      bar: 'rab',
      baz: 'zab',
      qux: null,
    },
  };
  const values = await Promise.all(names.map(name => resolvers[name](root, null, context)));
  t.deepEqual(values, ['OOF', 'RAB', 'ZAB', null]);
});

test('make attribute resolvers', (t) => {
  const names = ['foo', 'bar', 'baz'];
  const resolvers = makeAttributeResolvers(names);
  const root = {
    attributes: {
      foo: 'oof',
      bar: 'rab',
      baz: 'zab',
    },
  };
  const values = names.map(name => resolvers[name](root));
  t.deepEqual(values, ['oof', 'rab', 'zab']);
});
