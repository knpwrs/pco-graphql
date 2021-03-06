import React from 'react';
import PropTypes from 'prop-types';
import window from 'global/window';
import g, { Div } from 'glamorous';
import { gql, graphql } from 'react-apollo';
import { withHandlers } from 'recompose';
import { compose } from 'ramda';
import { translate } from 'react-i18next';
import { placeholderLoader } from '../components/loader';

const ProfileCardText = g.div({
  flexGrow: 1,
}, (props, theme) => ({
  ...theme.headerText,
}));

const ProfileCardImage = g.img({
  height: '100%',
  borderStyle: 'solid',
  borderWidth: '0 1px',
}, (props, theme) => ({
  borderColor: theme.borderColor,
}));

const LogoutLink = g.a((props, { headerText }) => ({
  ...headerText,
  position: 'absolute',
  left: 0,
  top: 0,
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  opacity: 0,
  transition: 'opacity 250ms',
  ':hover': {
    opacity: 1,
    cursor: 'pointer',
  },
}));

const ProfileCard = ({ data, logout, t, css }) => (
  <Div {...css} display="flex" position="relative">
    <ProfileCardImage src={data.me.avatar} />
    <ProfileCardText>{data.me.first_name} {data.me.last_name}</ProfileCardText>
    <LogoutLink onClick={logout}>{t('logout')}</LogoutLink>
  </Div>
);

ProfileCard.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    me: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
  logout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  css: PropTypes.objectOf(PropTypes.string),
};

ProfileCard.defaultProps = {
  css: {},
};

const currentUser = gql`
  query CurrentUser {
    me {
      first_name
      last_name
      avatar
    }
  }
`;

export default compose(
  graphql(currentUser),
  placeholderLoader({ color: 'white', width: '100px' }),
  withHandlers({
    logout: () => () => {
      window.location = '/auth/logout';
    },
  }),
  translate(),
)(ProfileCard);
