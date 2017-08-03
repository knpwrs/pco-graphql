import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';
import { gql, graphql } from 'react-apollo';

const currentUser = gql`
  query CurrentUser {
    me {
      first_name
      last_name
    }
  }
`;

const Profile = ({ data }) => {
  if (data.loading) return <g.H2 color="red">Loading...</g.H2>;
  return <h2>{data.me.last_name}, {data.me.first_name}</h2>;
};

Profile.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    me: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }).isRequired,
};

const ProfileWithData = graphql(currentUser)(Profile);

export default () => (
  <div>
    <ProfileWithData />
  </div>
);
