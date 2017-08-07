import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { branch, renderComponent, withHandlers } from 'recompose';
import { Div } from 'glamorous';
import { find, filter, identity, prop, match, map, compose } from 'ramda';
import Page from '../components/page';
import Card from '../components/card';
import Thumbnail from '../components/thumbnail';
import * as playerActions from '../actions/player';

const songsQuery = gql`
  query SongsQuery {
    totalSongs
    songs(order: title, per_page: 25) {
      id
      title
      author
      attachments {
        id
        filename
        url
        streamable
        thumbnail_url
      }
    }
  }
`;

const attachmentShape = PropTypes.shape({
  filename: PropTypes.string,
  url: PropTypes.string,
  streamble: PropTypes.boolean,
  thumbnail_url: PropTypes.string,
});

const songShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  attachments: PropTypes.arrayOf(attachmentShape),
});

const getThumbnailUrl = prop('thumbnail_url');
const findThumbnailUrl = compose(
  find(match(/\.(png|jpg|gif)$/)),
  filter(identity),
  map(getThumbnailUrl),
);

const filterStreamable = filter(prop('streamable'));

const BareSongFile = ({ toggleSong, file }) => (
  <Div key={file.id} fontWeight={200} onClick={toggleSong}>{file.filename}</Div>
);

BareSongFile.propTypes = {
  toggleSong: PropTypes.func.isRequired,
  file: attachmentShape.isRequired,
};

const SongFile = withHandlers({
  toggleSong: ({ file, thumb, setSong }) => () => setSong({
    thumb,
    url: file.url,
    title: file.filename,
  }),
})(BareSongFile);

const BareSongFiles = ({ song, thumb, actions }) => {
  const streamable = filterStreamable(song.attachments);
  return (
    <Div flexGrow="1" marginLeft="10px">
      {streamable.length > 0
        ? streamable.map(
          file => <SongFile key={file.id} file={file} thumb={thumb} setSong={actions.setSong} />,
        ) : <span>No Files</span>
      }
    </Div>
  );
};

BareSongFiles.propTypes = {
  song: songShape.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  thumb: PropTypes.string,
};

BareSongFiles.defaultProps = {
  thumb: null,
};

const mapStateToProps = ({ player }) => ({
  playerSong: player.song,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(playerActions, dispatch),
});

const SongFiles = connect(mapStateToProps, mapDispatchToProps)(BareSongFiles);

const SongInfo = ({ song }) => {
  const thumb = findThumbnailUrl(song.attachments);
  return (
    <Div display="flex">
      <Thumbnail thumb={thumb} size="150px" />
      <SongFiles song={song} thumb={thumb} />
    </Div>
  );
};

SongInfo.propTypes = {
  song: songShape.isRequired,
};

const SongCard = ({ song }) => (
  <Card title={song.title}>
    <SongInfo song={song} />
  </Card>
);

SongCard.propTypes = {
  song: songShape.isRequired,
};

const Songs = ({ data }) => (
  <Page title={`Songs (${data.totalSongs})`}>
    {data.songs.map(song => <SongCard key={song.id} song={song} />)}
  </Page>
);

Songs.propTypes = {
  data: PropTypes.shape({
    totalSongs: PropTypes.integer,
    songs: PropTypes.arrayOf(songShape),
  }).isRequired,
};

const placeholder = branch(
  ({ data }) => data.loading,
  renderComponent(props => (
    <Div {...props} backgroundColor="#F3F3F3" textAlign="center" width="100%" height="100%" />
  )),
);

export default compose(
  graphql(songsQuery),
  placeholder,
)(Songs);
