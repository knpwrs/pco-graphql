import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { css } from 'glamor';
import loadable from 'react-loadable';
import ThemeByRouteProvider from './components/theme-by-route-provider';
import FullPageDiv from './components/full-page-div';
import LoginPage from './components/login-page';
import AppHeader from './containers/app-header';
import Player from './containers/player';
import Loader from './components/loader';

css.global('body', {
  backgroundColor: '#FCFCFC',
});

const Plans = loadable({
  loader: () => import('./containers/plans'),
  loading: Loader,
});

const People = loadable({
  loader: () => import('./containers/people'),
  loading: Loader,
});

const Songs = loadable({
  loader: () => import('./containers/songs'),
  loading: Loader,
});

const Root = () => (
  // The route as well as routes expect single children as does the theme
  // provider. To work around this without nesting divs forever we essentially
  // treat the login page and the rest of the application as separate entry
  // points. This approach uses more code, but easier to reason about and leads
  // to cleaner output.
  <Router>
    <ThemeByRouteProvider>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/">
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
        </Route>
      </Switch>
    </ThemeByRouteProvider>
  </Router>
);

export default Root;
