import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';

const CardTitle = g.h3({
  fontWeight: 300,
  letterSpacing: '2px',
  margin: '0 0 10px 0',
});

const BareCard = ({ title, children, className }) => (
  <div className={className}>
    <CardTitle>{title}</CardTitle>
    {children}
  </div>
);

BareCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default g(BareCard)({
  padding: '20px',
  marginBottom: '10px',
  borderRadius: '10px',
}, ({ solid }, { lightBorderColor }) => ({
  border: `1px solid ${lightBorderColor}`,
  background: solid ? lightBorderColor : 'transparent',
}));
