import React from 'react';
import window from 'global/window';
import g from 'glamorous';
import { withHandlers } from 'recompose';
import FullPageDiv from './full-page-div';

const LoginHeader = g.h1((props, { bodyText }) => ({
  ...bodyText,
}));

const BareLoginButton = g.button((props, { bodyText, borderColor, lightBorderColor }) => ({
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
}));

const LoginButton = withHandlers({
  login: () => () => {
    window.location = '/auth/login';
  },
})(({ login }) => (
  <BareLoginButton onClick={login}>Authenticate with Planning Center</BareLoginButton>
));

const LoginPage = () => (
  <FullPageDiv center column>
    <LoginHeader>Planning Center GraphQL Demo</LoginHeader>
    <LoginButton />
  </FullPageDiv>
);

export default LoginPage;
