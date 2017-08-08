import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gql, graphql } from 'react-apollo';
import { translate } from 'react-i18next';
import { compose } from 'ramda';
import Page from '../components/page';
import PageNavBar from '../components/page-nav-bar';
import SongCard from '../components/songs/song-card';
import withPage from '../util/with-page';
import { placeholderLoader } from '../components/loader';
import { songShape } from '../shapes/songs';
import * as playerActions from '../actions/player';

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

const Songs = ({ data, page, actions, t }) => (
  <Page title={t('title', data)}>
    {data.songs.map(song => <SongCard key={song.id} song={song} setSong={actions.setSong} />)}
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
  t: PropTypes.func.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapStateToProps = ({ player }) => ({
  playerSong: player.song,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(playerActions, dispatch),
});

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
  connect(mapStateToProps, mapDispatchToProps),
  translate('songs'),
)(Songs);
