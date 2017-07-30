import test from 'ava';
import {
  makeLinkResolvers,
  makeAttributeResolvers,
  mergeAllDeep,
} from './utils';

test('make link resolvers', async (t) => {
  const names = ['foo', 'bar', 'baz', 'cat'];
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
      self: 'self',
    },
  };
  const values = await Promise.all(names.map(name => resolvers[name](root, null, context)));
  t.deepEqual(values, ['OOF', 'RAB', 'ZAB', 'SELF/CAT']);
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

test('mergeAllDeep', (t) => {
  t.deepEqual(mergeAllDeep([{
    foo: {
      bar: 1,
      baz: {
        cat: 'meow',
      },
      bird: 'squak',
    },
  }, {
    foo: {
      baz: {
        dog: 'woof',
      },
      qux: 2,
      bird: 'tweet',
    },
  }]), {
    foo: {
      bar: 1,
      qux: 2,
      bird: 'tweet',
      baz: {
        cat: 'meow',
        dog: 'woof',
      },
    },
  });
});
