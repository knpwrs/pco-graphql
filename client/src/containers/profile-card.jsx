import React from 'react';
import PropTypes from 'prop-types';
import g, { Div } from 'glamorous';
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent, compose } from 'recompose';

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

const ProfileCard = ({ data, ...props }) => (
  <Div {...props} display="flex">
    <ProfileCardImage src={data.me.avatar} />
    <ProfileCardText>{data.me.first_name} {data.me.last_name}</ProfileCardText>
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

const placeholder = branch(
  ({ data }) => data.loading,
  renderComponent(props => (
    <Div {...props} backgroundColor="#F3F3F3" textAlign="center" width="250px" height="50px" />
  )),
);

const withData = graphql(currentUser);

export default compose(
  withData,
  placeholder,
)(ProfileCard);
