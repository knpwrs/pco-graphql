import React from 'react';
import PropTypes from 'prop-types';
import { Div } from 'glamorous';
import { compose, prop, find, match, filter, map, identity } from 'ramda';
import Thumbnail from '../thumbnail';
import SongFiles from './song-files';
import { songShape } from '../../shapes/songs';

const getThumbnailUrl = prop('thumbnail_url');
const findThumbnailUrl = compose(
  find(match(/\.(png|jpg|gif)$/)),
  filter(identity),
  map(getThumbnailUrl),
);

const SongInfo = ({ song, setSong }) => {
  const thumb = findThumbnailUrl(song.attachments);
  return (
    <Div display="flex">
      <Thumbnail thumb={thumb} size="150px" />
      <SongFiles song={song} thumb={thumb} setSong={setSong} />
    </Div>
  );
};

SongInfo.propTypes = {
  song: songShape.isRequired,
  setSong: PropTypes.func.isRequired,
};

export default SongInfo;
