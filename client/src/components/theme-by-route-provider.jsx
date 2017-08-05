import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'glamorous';
import { withRouter } from 'react-router-dom';
import { compose, split, filter, identity, head, prop, propOr, __ } from 'ramda';

const colors = {
  darkGray: '#282B30',
  green: '#8DBE5D',
  blue: '#6C99C4',
  orange: '#E8A04B',
};

const baseTheme = {
  borderColor: colors.darkGray,
  fontFamily: 'Lato',
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    fontSize: '0.9em',
    color: '#FFF',
  },
};

const themes = {
  plans: {
    ...baseTheme,
    primaryColor: colors.green,
  },
  people: {
    ...baseTheme,
    primaryColor: colors.blue,
  },
  songs: {
    ...baseTheme,
    primaryColor: colors.orange,
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
