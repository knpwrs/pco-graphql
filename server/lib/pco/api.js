import qs from 'qs';
import { curry, clone } from 'ramda';

export const API_BASE = 'https://api.planningcenteronline.com';

export const adjustApiArgs = (args) => {
  const apiArgs = clone(args);
  if (apiArgs.desc) {
    apiArgs.order = `-${apiArgs.order}`;
  }
  delete apiArgs.desc;
  return apiArgs;
};

export const getTypeUrl = curry((api, type) => `${API_BASE}/${api}/v2/${type}`);
export const getResourceUrl = curry((api, type, id) => `${getTypeUrl(api, type)}/${id}`);
export const getQueryUrl = curry((api, type, query) =>
  `${getTypeUrl(api, type)}?${qs.stringify(adjustApiArgs(query))}`);
