import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { css } from 'glamor';
import { Div } from 'glamorous';
import loadable from 'react-loadable';
import ThemeByRouteProvider from './components/theme-by-route-provider';
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

const Root = () => (
  <Router>
    <ThemeByRouteProvider>
      <Div width="100vw" height="100vh">
        <AppHeader />
        <Switch>
          <Route path="/plans" component={Plans} />
          <Route path="/people" component={People} />
          <Route path="/songs" component={Songs} />
          <Redirect to="/plans" />
        </Switch>
        <Player />
      </Div>
    </ThemeByRouteProvider>
  </Router>
);

export default Root;
