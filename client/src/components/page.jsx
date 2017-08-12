import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import g from 'glamorous';
import { H2 } from './typography';

const PageWrap = g.div(({ playerOpen }) => ({
  width: '100%',
  padding: `0 5% ${playerOpen ? '60px' : '20px'} 5%`,
}), (props, { bodyText }) => ({
  ...bodyText,
}));

const Page = ({ title, playerOpen, children }) => (
  <PageWrap playerOpen={playerOpen}>
    <H2>{title}</H2>
    {children}
  </PageWrap>
);

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  playerOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ player }) => ({
  playerOpen: !!player.url,
});

export default connect(mapStateToProps)(Page);
