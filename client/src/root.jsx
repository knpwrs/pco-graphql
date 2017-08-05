import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { Div } from 'glamorous';
import ThemeByRouteProvider from './containers/theme-by-route-provider';
import AppHeader from './containers/app-header';

css.global('body', {
  backgroundColor: '#FCFCFC',
});

const Plans = () => <div><h2>Plans</h2></div>;
const People = () => <div><h2>People</h2></div>;
const Song = ({ match }) => (
  <div>
    <h3>Song: {match.params.songId}</h3>
  </div>
);

Song.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      songId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const Songs = ({ match }) => (
  <div>
    <h2>Songs</h2>
    <ul>
      <li>
        <Link to={`${match.url}/1`}>Fierce</Link>
      </li>
      <li>
        <Link to={`${match.url}/2`}>Brighter</Link>
      </li>
      <li>
        <Link to={`${match.url}/3`}>Here As In Heaven</Link>
      </li>
    </ul>
    <Route path={`${match.url}/:songId`} component={Song} />
    <Route
      exact
      path={`${match.url}`}
      render={() => (
        <h3>Please select a song.</h3>
      )}
    />
  </div>
);

Songs.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

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
