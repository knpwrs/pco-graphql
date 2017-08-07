import React from 'react';
import PropTypes from 'prop-types';
import g, { Div } from 'glamorous';
import { css } from 'glamor';
import { renderComponent, branch } from 'recompose';

// Easing from: http://easings.net/#easeInOutCirc
const easing = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';

const loading = css.keyframes('loading', {
  '0%': {
    transform: 'scale(0)',
  },
  '100%': {
    transform: 'scale(1)',
    opacity: 0,
  },
});

const Loader = g.div(({ color }, { loaderColor }) => ({
  width: '40px',
  height: '40px',
  backgroundColor: color || loaderColor,
  borderRadius: '100%',
  animation: `${loading} 1s infinite ${easing}`,
}));

export default Loader;

export const FullSpaceLoader = ({ width, height, ...props }) => (
  <Div width={width} height={height} display="flex" justifyContent="center" alignItems="center">
    <Loader {...props} />
  </Div>
);

FullSpaceLoader.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FullSpaceLoader.defaultProps = {
  width: '100%',
  height: '100%',
};

export const placeholderLoader = (props = {}) => branch(
  ({ data }) => data.loading,
  renderComponent(() => <FullSpaceLoader {...props} />),
);
