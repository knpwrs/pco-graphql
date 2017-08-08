import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import { compose } from 'ramda';
import * as playerActions from '../actions/player';
import Player from '../components/player';

const PlayerContainer = ({ player, actions }) => (
  <Player {...player} close={actions.clearSong} />
);

PlayerContainer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  player: PropTypes.shape({
    url: PropTypes.string,
    thumb: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ player }) => ({
  player,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(playerActions, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(PlayerContainer);
