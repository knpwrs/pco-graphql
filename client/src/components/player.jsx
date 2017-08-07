/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';
import { branch, renderNothing } from 'recompose';
import { complement, prop } from 'ramda';
import Thumbnail from './thumbnail';

const playerHeight = '50px';

const PlayerWrapper = g.div((props, { borderColor }) => ({
  backgroundColor: borderColor,
  width: '100vw',
  height: playerHeight,
  position: 'fixed',
  left: 0,
  bottom: 0,
  display: 'flex',
}));

const CloseButton = g.button((props, { lightBorderColor, headerText }) => ({
  ...headerText,
  color: lightBorderColor,
  width: playerHeight,
  height: playerHeight,
  border: 0,
  marginLeft: 'auto',
}));

const NowPlaying = g.div((props, { headerText }) => ({
  ...headerText,
  fontWeight: 200,
  marginLeft: '15px',
  lineHeight: playerHeight,
}));

const Player = ({ url, thumb, title, close }) => (
  <PlayerWrapper>
    <Thumbnail thumb={thumb} size={playerHeight} />
    <NowPlaying>Now Playing: {title}</NowPlaying>
    <CloseButton onClick={close}>X</CloseButton>
    <audio src={url} autoPlay />
  </PlayerWrapper>
);

Player.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  thumb: PropTypes.string,
};

Player.defaultProps = {
  thumb: null,
};

export default branch(
  complement(prop('url')),
  renderNothing,
)(Player);
