import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import g, { Div } from 'glamorous';
import { find, filter, identity, prop, match, map, compose } from 'ramda';
import Page from '../components/page';
import Card from '../components/card';
import Thumbnail from '../components/thumbnail';
import PageNavBar from '../components/page-nav-bar';
import * as playerActions from '../actions/player';
import withPage from '../util/with-page';
import { placeholderLoader } from '../components/loader';

const PER_PAGE = 10;

const songsQuery = gql`
  query SongsQuery($offset: Int!, $per_page: Int!) {
    totalSongs
    songs(order: title, per_page: $per_page, offset: $offset) {
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

const FileRow = g.div((props, { highlightColor }) => ({
  fontWeight: 200,
  ':hover': {
    backgroundColor: highlightColor,
    cursor: 'pointer',
  },
}));

const BareSongFile = ({ toggleSong, file }) => (
  <FileRow key={file.id} onClick={toggleSong}>{file.filename}</FileRow>
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

const Songs = ({ data, page }) => (
  <Page title={`Songs (${data.totalSongs})`}>
    {data.songs.map(song => <SongCard key={song.id} song={song} />)}
    <PageNavBar
      root="songs"
      page={page}
      perPage={PER_PAGE}
      totalRecords={data.totalSongs}
      currentRecords={data.songs.length}
    />
  </Page>
);

Songs.propTypes = {
  data: PropTypes.shape({
    totalSongs: PropTypes.integer,
    songs: PropTypes.arrayOf(songShape),
  }).isRequired,
  page: PropTypes.number.isRequired,
};

export default compose(
  withPage,
  graphql(songsQuery, {
    options: ({ page }) => ({
      variables: {
        offset: page * PER_PAGE,
        per_page: PER_PAGE,
      },
    }),
  }),
  placeholderLoader(),
)(Songs);
