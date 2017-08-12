import React from 'react';
import PropTypes from 'prop-types';
import SongInfo from './song-info';
import Card from '../card';
import { H3 } from '../typography';
import { songShape } from '../../shapes/songs';

const SongCard = ({ song, setSong }) => (
  <Card>
    <H3>{song.title}</H3>
    <SongInfo song={song} setSong={setSong} />
  </Card>
);

SongCard.propTypes = {
  song: songShape.isRequired,
  setSong: PropTypes.func.isRequired,
};

export default SongCard;
