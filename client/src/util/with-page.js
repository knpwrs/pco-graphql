import { withProps } from 'recompose';
import parseQueryArgs from './parse-query-args';

export default withProps(({ location }) => ({
  page: parseQueryArgs(location.search).page,
}));
