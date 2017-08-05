import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

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

export default Songs;
