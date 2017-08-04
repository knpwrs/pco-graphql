import React from 'react';
import PropTypes from 'prop-types';
import { Div, H3 } from 'glamorous';
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent, compose } from 'recompose';

const ProfileCard = ({ data, ...props }) => (
  <H3 {...props}>{data.me.last_name}, {data.me.first_name}</H3>
);

ProfileCard.propTypes = {
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
  renderComponent(props => (
    <Div {...props} backgroundColor="#F3F3F3" textAlign="center" width="250px" height="50px" />
  )),
);

const withData = graphql(currentUser);

export default compose(
  withData,
  placeholder,
)(ProfileCard);
