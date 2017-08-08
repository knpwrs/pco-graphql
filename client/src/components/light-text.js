import React from 'react';
import { Span } from 'glamorous';

export default ({ text, ...props }) => <Span {...props} opacity="0.2">{text}</Span>;
