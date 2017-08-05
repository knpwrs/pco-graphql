import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'glamorous';
import { withRouter } from 'react-router-dom';
import { compose, split, filter, identity, head, prop, propOr, __ } from 'ramda';

const themes = {
  plans: {
    primaryColor: 'green',
  },
  people: {
    primaryColor: 'blue',
  },
  songs: {
    primaryColor: 'orange',
  },
};

const selectThemeByLocation = compose(
  propOr(themes.plans, __, themes), // Default to plans theme
  head,
  filter(identity),
  split('/'),
  prop('pathname'),
);

const ThemeByRouteProvider = ({ location, children }) => (
  <ThemeProvider theme={selectThemeByLocation(location)}>
    {children}
  </ThemeProvider>
);

ThemeByRouteProvider.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(ThemeByRouteProvider);
