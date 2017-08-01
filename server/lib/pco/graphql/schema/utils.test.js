import test from 'ava';
import {
  makeLinkResolvers,
  makeRelationshipResolvers,
  makeAttributeResolvers,
  mergeAllDeep,
} from './utils';
import { getResourceUrl } from '../../api';

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

test('make relationship resolvers', async (t) => {
  const args = [
    { key: 'person', api: 'people', resource: 'people' },
    { key: 'plan', api: 'services', resource: 'plans' },
    { key: 'song', api: 'services', resource: 'songs' },
  ];
  const resolvers = makeRelationshipResolvers(args);
  const context = {
    loader: {
      load: async key => key, // async identity
    },
  };
  const root = {
    relationships: {
      person: {
        data: {
          type: 'Person',
          id: '1337',
        },
      },
      plan: {
        data: {
          type: 'Plan',
          id: '7331',
        },
      },
      song: {
        data: null,
      },
    },
  };
  const values = await Promise.all(args.map(({ key }) => resolvers[key](root, null, context)));
  t.deepEqual(values, [
    getResourceUrl('people', 'people', '1337'),
    getResourceUrl('services', 'plans', '7331'),
    null,
  ]);
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
