import React from 'react';
import PropTypes from 'prop-types';
import window from 'global/window';
import g from 'glamorous';
import { translate } from 'react-i18next';
import { withHandlers } from 'recompose';
import { compose } from 'ramda';
import FullPageDiv from './full-page-div';

const LoginHeader = g.h1((props, { bodyText }) => ({
  ...bodyText,
}));

const LoginButton = g.button((props, { bodyText, borderColor, lightBorderColor }) => ({
  ...bodyText,
  fontWeight: 'bold',
  padding: '10px',
  borderRadius: '10px',
  border: `1px solid ${borderColor}`,
  transition: 'all 250ms',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: borderColor,
    color: lightBorderColor,
  },
  ':focus': {
    outline: 0,
  },
}));

const BareLoginPage = ({ login, t }) => (
  <FullPageDiv center column>
    <LoginHeader>{t('title')}</LoginHeader>
    <LoginButton onClick={login}>{t('authenticate')}</LoginButton>
  </FullPageDiv>
);

BareLoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  withHandlers({
    login: () => () => {
      window.location = '/auth/login';
    },
  }),
  translate(),
)(BareLoginPage);
