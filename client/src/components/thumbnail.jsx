import React from 'react';
import PropTypes from 'prop-types';
import g, { Img } from 'glamorous';

const Thumbnail = ({ thumb, className }) => (
  <div className={className}>
    {thumb ? <Img src={thumb} width="100%" height="100%" /> : null}
  </div>
);

Thumbnail.propTypes = {
  className: PropTypes.string.isRequired,
  thumb: PropTypes.string,
};

Thumbnail.defaultProps = {
  thumb: null,
};

export default g(Thumbnail)(({ size }, { lightBorderColor }) => ({
  width: size,
  height: size,
  backgroundColor: lightBorderColor,
}));
