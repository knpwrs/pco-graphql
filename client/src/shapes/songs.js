import PropTypes from 'prop-types';

export const attachmentShape = PropTypes.shape({
  filename: PropTypes.string,
  url: PropTypes.string,
  streamble: PropTypes.boolean,
  thumbnail_url: PropTypes.string,
});

export const songShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  attachments: PropTypes.arrayOf(attachmentShape),
});
