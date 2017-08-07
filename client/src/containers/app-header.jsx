import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
import { withRouter } from 'react-router-dom';
import g, { Nav } from 'glamorous';
import { translate } from 'react-i18next';
import ProfileCard from './profile-card';
import styledLink from '../components/styled-link';

const headerHeight = '50px';

const isActive = ({ to, location: { pathname } }) => pathname.startsWith(to);

const NavLink = compose(
  withRouter,
  setDisplayName('NavLink'),
  styledLink,
)({
  width: '150px',
  height: headerHeight,
  lineHeight: headerHeight,
  borderStyle: 'solid',
  borderWidth: '0 1px 0 0',
  display: 'block',
  textDecoration: 'none',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  transition: 'background-color 250ms',
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
}, (props, theme) => ({
  ...theme.headerText,
  borderColor: theme.borderColor,
  backgroundColor: isActive(props) ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)',
}));

const HeaderWrapper = g.header({
  display: 'flex',
  height: headerHeight,
  justifyContent: 'space-between',
  transition: 'background-color 250ms',
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
}, (props, theme) => ({
  backgroundColor: theme.primaryColor,
  borderColor: theme.borderColor,
}));

const AppHeader = ({ t }) => (
  <HeaderWrapper>
    <Nav display="flex">
      <NavLink to="/plans">{t('plans')}</NavLink>
      <NavLink to="/people">{t('people')}</NavLink>
      <NavLink to="/songs">{t('songs')}</NavLink>
    </Nav>
    <ProfileCard css={{ width: '200px', lineHeight: headerHeight }} lineHeight={headerHeight} />
  </HeaderWrapper>
);

AppHeader.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('pages')(AppHeader);
