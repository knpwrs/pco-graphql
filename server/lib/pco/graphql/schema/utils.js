import {
  compose,
  reduce,
  merge,
  map,
  path,
  mergeDeepRight,
} from 'ramda';
import yuri from 'yuri';
import qs from 'qs';

const reduceMerge = reduce(merge, {});

export const makeLinkResolvers = compose(
  reduceMerge,
  map(key => ({
    [key]: async (root, args, { loader }) => {
      const link = root.links[key] || `${root.links.self}/${key}`;
      if (!link) return null;
      return loader.load(yuri(link).search(qs.stringify(args)).format());
    },
  })),
);

export const makeAttributeResolvers = compose(
  reduceMerge,
  map(key => ({
    [key]: path(['attributes', key]),
  })),
);

export const mergeAllDeep = reduce(mergeDeepRight, {});
