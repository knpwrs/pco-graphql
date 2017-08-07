import React from 'react';
import window from 'global/window';
import { withHandlers } from 'recompose';
import FullPageDiv from './full-page-div';

const LoginButton = withHandlers({
  login: () => () => {
    window.location = '/auth/login';
  },
})(({ login }) => <button onClick={login}>Authenticate with Planning Center</button>);

const LoginPage = () => (
  <FullPageDiv center column>
    <h1>Planning Center GraphQL Demo</h1>
    <LoginButton />
  </FullPageDiv>
);

export default LoginPage;
