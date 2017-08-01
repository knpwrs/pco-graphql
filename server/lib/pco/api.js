import qs from 'qs';
import { curry } from 'ramda';

export const API_BASE = 'https://api.planningcenteronline.com';

export const getTypeUrl = curry((api, type) => `${API_BASE}/${api}/v2/${type}`);
export const getResourceUrl = curry((api, type, id) => `${getTypeUrl(api, type)}/${id}`);
export const getQueryUrl = curry((api, type, query) => `${getTypeUrl(api, type)}?${qs.stringify(query)}`);
