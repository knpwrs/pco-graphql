import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { css } from 'glamor';
import { Div } from 'glamorous';
import ThemeByRouteProvider from './components/theme-by-route-provider';
import AppHeader from './containers/app-header';
import Plans from './containers/plans';
import People from './containers/people';
import Songs from './containers/songs';

css.global('body', {
  backgroundColor: '#FCFCFC',
});

const Root = () => (
  <Router>
    <ThemeByRouteProvider>
      <Div width="100vw" height="100vh" overflowY="auto">
        <AppHeader />
        <Switch>
          <Route path="/plans" component={Plans} />
          <Route path="/people" component={People} />
          <Route path="/songs" component={Songs} />
          <Redirect to="/plans" />
        </Switch>
      </Div>
    </ThemeByRouteProvider>
  </Router>
);

export default Root;
