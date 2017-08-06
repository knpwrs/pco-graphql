import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';

const PageWrap = g.div({
  width: '100%',
  padding: '0 5% 5% 5%',
}, (props, { bodyText }) => ({
  ...bodyText,
}));

const PageTitle = g.h2({
  letterSpacing: '2px',
  fontWeight: 500,
  fontSize: '30px',
});

const Page = ({ title, children }) => (
  <PageWrap>
    <PageTitle>{title}</PageTitle>
    {children}
  </PageWrap>
);

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Page;
