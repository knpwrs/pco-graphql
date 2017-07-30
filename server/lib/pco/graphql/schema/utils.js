import { compose, reduce, merge, map, path } from 'ramda';

export const makeLinkResolvers = compose(
  reduce(merge, {}),
  map(key => ({
    [key]: async (root, args, { loader }) => {
      const link = root.links[key] || `${root.links.self}/${key}`;
      if (!link) return null;
      return loader.load(link);
    },
  })),
);

export const makeAttributeResolvers = compose(
  reduce(merge, {}),
  map(key => ({
    [key]: path(['attributes', key]),
  })),
);
