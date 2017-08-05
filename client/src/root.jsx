import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import g, { Div, Header, Nav } from 'glamorous';
import ProfileCard from './containers/profile-card';

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

const headerHeight = '50px';
const NavBlock = g.div({
  width: '150px',
  height: headerHeight,
  lineHeight: headerHeight,
});

const Root = () => (
  <Router>
    <Div width="100vw" height="100vh" overflowY="auto">
      <Header display="flex" height={headerHeight} justifyContent="space-between">
        <Nav display="flex">
          <NavBlock><Link to="/">Plans</Link></NavBlock>
          <NavBlock><Link to="/people">People</Link></NavBlock>
          <NavBlock><Link to="/songs">Songs</Link></NavBlock>
        </Nav>
        <ProfileCard width="200px" lineHeight={headerHeight} />
      </Header>
      <Switch>
        <Route path="/plans" component={Plans} />
        <Route path="/people" component={People} />
        <Route path="/songs" component={Songs} />
        <Redirect to="/plans" />
      </Switch>
    </Div>
  </Router>
);

export default Root;
