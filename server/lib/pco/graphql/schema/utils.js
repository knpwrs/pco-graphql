import {
  compose,
  reduce,
  merge,
  map,
  path,
  mergeDeepRight,
} from 'ramda';
import yuri from 'yuri';

export const makeLinkResolvers = compose(
  reduce(merge, {}),
  map(key => ({
    [key]: async (root, args, { loader }) => {
      const link = root.links[key] || `${root.links.self}/${key}`;
      if (!link) return null;
      return loader.load(yuri(link).query(args).format());
    },
  })),
);

export const makeAttributeResolvers = compose(
  reduce(merge, {}),
  map(key => ({
    [key]: path(['attributes', key]),
  })),
);

export const mergeAllDeep = reduce(mergeDeepRight, {});
