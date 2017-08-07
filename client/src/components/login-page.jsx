import React from 'react';
import PropTypes from 'prop-types';
import window from 'global/window';
import g from 'glamorous';
import { withHandlers } from 'recompose';
import FullPageDiv from './full-page-div';

const LoginHeader = g.h1((props, { bodyText }) => ({
  ...bodyText,
}));

const LoginButton = g.button((props, { bodyText, borderColor, lightBorderColor }) => ({
  ...bodyText,
  fontWeight: 'bold',
  padding: '10px',
  borderRadius: '10px',
  border: `1px solid ${borderColor}`,
  transition: 'all 250ms',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: borderColor,
    color: lightBorderColor,
  },
  ':focus': {
    outline: 0,
  },
}));

const BareLoginPage = ({ login }) => (
  <FullPageDiv center column>
    <LoginHeader>Planning Center GraphQL Demo</LoginHeader>
    <LoginButton onClick={login}>Authenticate with Planning Center</LoginButton>
  </FullPageDiv>
);

BareLoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

export default withHandlers({
  login: () => () => {
    window.location = '/auth/login';
  },
})(BareLoginPage);
