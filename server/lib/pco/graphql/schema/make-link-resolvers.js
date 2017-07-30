import { compose, reduce, merge, map } from 'ramda';

export default compose(
  reduce(merge, {}),
  map(key => ({
    [key]: async (root, args, { loader }) => {
      const link = root.links[key];
      if (!link) return null;
      return loader.load(link);
    },
  })),
);
