import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';

const BareCard = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);

BareCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default g(BareCard)({
  padding: '0 20px 20px',
  marginBottom: '10px',
  borderRadius: '10px',
}, ({ solid }, { lightBorderColor }) => ({
  border: `1px solid ${lightBorderColor}`,
  background: solid ? lightBorderColor : 'transparent',
}));
