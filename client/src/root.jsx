import React from 'react';
import PropTypes from 'prop-types';
import { Div } from 'glamorous';
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent, compose } from 'recompose';

const Profile = ({ data }) => (
  <h2>{data.me.last_name}, {data.me.first_name}</h2>
);

Profile.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    me: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }).isRequired,
};

const currentUser = gql`
  query CurrentUser {
    me {
      first_name
      last_name
    }
  }
`;

const placeholder = branch(
  ({ data }) => data.loading,
  renderComponent(() => (
    <Div backgroundColor="#F3F3F3" textAlign="center" width="250px" height="50px" />
  )),
);

const withData = graphql(currentUser);

export default compose(
  withData,
  placeholder,
)(Profile);
