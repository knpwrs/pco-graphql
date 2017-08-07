import React from 'react';
import window from 'global/window';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { css } from 'glamor';
import loadable from 'react-loadable';
import { withHandlers } from 'recompose';
import ThemeByRouteProvider from './components/theme-by-route-provider';
import FullPageDiv from './components/full-page-div';
import AppHeader from './containers/app-header';
import Player from './containers/player';

css.global('body', {
  backgroundColor: '#FCFCFC',
});

const loading = () => <h2>Loading</h2>;

const Plans = loadable({
  loader: () => import('./containers/plans'),
  loading,
});

const People = loadable({
  loader: () => import('./containers/people'),
  loading,
});

const Songs = loadable({
  loader: () => import('./containers/songs'),
  loading,
});

const LoginButton = withHandlers({
  login: () => () => {
    window.location = '/auth/login';
  },
})(({ login }) => <button onClick={login}>Authenticate with Planning Center</button>);

const Root = () => (
  // The route as well as routes expect single children as does the theme
  // provider. To work around this without nesting divs forever we essentially
  // treat the login page and the rest of the application as separate entry
  // points. This approach uses more code, but easier to reason about and leads
  // to cleaner output.
  <Router>
    <Switch>
      <Route path="/login">
        <FullPageDiv center column>
          <h1>Planning Center GraphQL Demo</h1>
          <LoginButton />
        </FullPageDiv>
      </Route>
      <Route path="/">
        <ThemeByRouteProvider>
          <FullPageDiv>
            <AppHeader />
            <Switch>
              <Route path="/plans" component={Plans} />
              <Route path="/people" component={People} />
              <Route path="/songs" component={Songs} />
              <Redirect to="/plans" />
            </Switch>
            <Player />
          </FullPageDiv>
        </ThemeByRouteProvider>
      </Route>
    </Switch>
  </Router>
);

export default Root;
