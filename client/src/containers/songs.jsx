import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent } from 'recompose';
import { Div, Img } from 'glamorous';
import { find, filter, identity, prop, match, map, compose } from 'ramda';
import Page from '../components/page';
import Card from '../components/card';

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

const Thumbnail = ({ attachments }) => {
  const url = findThumbnailUrl(attachments);
  return (
    <Div width="150px" height="150px" backgroundColor="#EEE">
      {url ? <Img src={url} width="100%" height="100%" /> : null}
    </Div>
  );
};

Thumbnail.propTypes = {
  attachments: PropTypes.arrayOf(attachmentShape).isRequired,
};

const filterStreamable = filter(prop('streamable'));

const SongFiles = ({ attachments }) => (
  <Div flexGrow="1" marginLeft="10px">
    {filterStreamable(attachments).map(file => (
      <Div key={file.id} fontWeight={200}>{file.filename}</Div>
    ))}
  </Div>
);

SongFiles.propTypes = {
  attachments: PropTypes.arrayOf(attachmentShape).isRequired,
};

const SongInfo = ({ song }) => (
  <Div display="flex">
    <Thumbnail attachments={song.attachments} />
    <SongFiles attachments={song.attachments} />
  </Div>
);

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
