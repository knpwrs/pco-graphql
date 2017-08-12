import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'glamorous';
import { withRouter } from 'react-router-dom';
import { compose, split, filter, identity, head, prop, propOr, __ } from 'ramda';

const colors = {
  darkGray: '#282B30',
  lightGray: '#EEE',
  green: 'rgba(141, 190, 93, 1)',
  transparentGreen: 'rgba(141, 190, 93, 0.1)',
  blue: 'rgba(108, 153, 196, 1)',
  transparentBlue: 'rgba(108, 153, 196, 0.1)',
  orange: 'rgba(232, 160, 75, 1)',
  transparentOrange: 'rgba(232, 160, 75, 0.1)',
};

const fontFamily = 'Lato';

const baseTheme = {
  borderColor: colors.darkGray,
  lightBorderColor: colors.lightGray,
  headerText: {
    fontFamily,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    fontSize: '0.9em',
    color: '#FFF',
  },
  bodyText: {
    fontFamily,
    color: colors.darkGray,
  },
  h2: {
    letterSpacing: '2px',
    fontWeight: 500,
    fontSize: '1.5em',
  },
  h3: {
    fontWeight: 'bold',
    margin: '1em 0',
  },
};

const themes = {
  plans: {
    ...baseTheme,
    primaryColor: colors.green,
    highlightColor: colors.transparentGreen,
  },
  people: {
    ...baseTheme,
    primaryColor: colors.blue,
    highlightColor: colors.transparentBlue,
  },
  songs: {
    ...baseTheme,
    primaryColor: colors.orange,
    highlightColor: colors.transparentOrange,
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
