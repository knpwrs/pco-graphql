import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import g from 'glamorous';

const StyledLink = ({ children, to, className }) => (
  <Link to={to} className={className}>{children}</Link>
);

StyledLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default g(StyledLink);
