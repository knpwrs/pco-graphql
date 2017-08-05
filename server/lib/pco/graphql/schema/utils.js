import {
  compose,
  reduce,
  merge,
  map,
  path,
  mergeDeepRight,
  clone,
} from 'ramda';
import qs from 'qs';
import { getResourceUrl } from '../../api';

const reduceMerge = reduce(merge, {});

export const adjustApiArgs = (args) => {
  const apiArgs = clone(args);
  if (apiArgs.desc) {
    apiArgs.order = `-${apiArgs.order}`;
  }
  delete apiArgs.desc;
  return apiArgs;
};

export const makeLinkResolvers = compose(
  reduceMerge,
  map(key => ({
    [key]: async (root, args, { loader }) => {
      const link = root.links[key] || `${root.links.self}/${key}`;
      const apiArgs = adjustApiArgs(args);
      const query = qs.stringify(apiArgs);
      return loader.load(`${link}${query ? `?${query}` : ''}`);
    },
  })),
);

export const makeRelationshipResolvers = compose(
  reduce(merge, {}),
  map(({ key, api, resource }) => ({
    [key]: async (root, args, { loader }) => {
      const { data } = root.relationships[key];
      if (!data) return null;
      if (!data.id || data.id === '0') return null;
      return loader.load(getResourceUrl(api, resource, data.id));
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
