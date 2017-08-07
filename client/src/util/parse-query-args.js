import qs from 'qs';
import { compose, evolve, merge, clamp } from 'ramda';

export default compose(
  evolve({ page: compose(clamp(0, Infinity), parseInt) }),
  merge({ page: 0 }),
  qs.parse,
  search => search.substr(1),
);

