import React from 'react';
import { Link } from 'react-router-dom';
import g from 'glamorous';

export default g(({ children, ...other }) => (
  <Link {...other}>{children}</Link>
));
