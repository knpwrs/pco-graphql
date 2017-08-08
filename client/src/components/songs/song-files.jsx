import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import g, { Div } from 'glamorous';
import { withHandlers } from 'recompose';
import { filter, prop } from 'ramda';
import { attachmentShape, songShape } from '../../shapes/songs';

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

const BareSongFiles = ({ song, thumb, setSong, t }) => {
  const streamable = filterStreamable(song.attachments);
  return (
    <Div flexGrow="1" marginLeft="10px">
      {streamable.length > 0
        ? streamable.map(
          file => <SongFile key={file.id} file={file} thumb={thumb} setSong={setSong} />,
        ) : <span>{t('noFiles')}</span>
      }
    </Div>
  );
};

BareSongFiles.propTypes = {
  song: songShape.isRequired,
  thumb: PropTypes.string,
  setSong: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

BareSongFiles.defaultProps = {
  thumb: null,
};

export default translate('songs')(BareSongFiles);
