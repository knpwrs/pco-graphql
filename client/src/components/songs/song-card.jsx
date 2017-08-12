import React from 'react';
import PropTypes from 'prop-types';
import SongInfo from './song-info';
import Card from '../card';
import { songShape } from '../../shapes/songs';

const SongCard = ({ song, setSong }) => (
  <Card>
    <h3>{song.title}</h3>
    <SongInfo song={song} setSong={setSong} />
  </Card>
);

SongCard.propTypes = {
  song: songShape.isRequired,
  setSong: PropTypes.func.isRequired,
};

export default SongCard;
