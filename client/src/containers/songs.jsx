import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent, compose } from 'recompose';
import { Div } from 'glamorous';
import Page from '../components/page';

const songsQuery = gql`
  query SongsQuery {
    totalSongs
    songs(order: title, per_page: 25) {
      id
      title
      author
    }
  }
`;

const songShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
});

const Song = ({ song }) => (
  <div>
    <h3>{song.title} by {song.author}</h3>
  </div>
);

Song.propTypes = {
  song: songShape.isRequired,
};

const Songs = ({ data }) => (
  <Page title={`Songs (${data.totalSongs})`}>
    {data.songs.map(song => <Song key={song.id} song={song} />)}
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
