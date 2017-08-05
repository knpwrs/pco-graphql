import React from 'react';
import { Link } from 'react-router-dom';
import g from 'glamorous';

export default g(({ children, to, className }) => (
  <Link to={to} className={className}>{children}</Link>
));
