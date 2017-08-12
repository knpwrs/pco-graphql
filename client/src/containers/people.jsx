import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { compose } from 'ramda';
import { translate } from 'react-i18next';
import Page from '../components/page';
import PersonCard from '../components/people/person-card';
import PageNavBar from '../components/page-nav-bar';
import withPage from '../util/with-page';
import { placeholderLoader } from '../components/loader';
import { personShape } from '../shapes/people';

const PER_PAGE = 10;

const peopleQuery = gql`
  query PeopleQuery($offset: Int!, $per_page: Int!) {
    totalPeople
    people(order: first_name, per_page: $per_page, offset: $offset) {
      id
      first_name
      last_name
      phone_numbers {
        id
        number
        location
      }
      emails {
        id
        address
        location
      }
    }
  }
`;

const updatePersonMutation = gql`
  mutation UpdatePerson($id: ID!, $first_name: String!, $last_name: String!) {
    updatePerson(id: $id, attributes: { first_name: $first_name, last_name: $last_name }) {
      id
      __typename
      first_name
      last_name
    }
  }
`;

const updateEmailMutation = gql`
  mutation UpdateEmail($personId: ID!, $emailId: ID!, $values: EmailAttributes!) {
    updateEmail(personId: $personId, emailId: $emailId, attributes: $values) {
      id
      __typename
      address
      location
    }
  }
`;

const updatePhoneNumberMutation = gql`
  mutation UpdatePhoneNumber($personId: ID!, $phoneNumberId: ID!, $values: PhoneNumberAttributes!) {
    updatePhoneNumber(personId: $personId, phoneNumberId: $phoneNumberId, attributes: $values) {
      id
      __typename
      number
      location
    }
  }
`;

const People = ({ data, page, updatePerson, updateEmail, updatePhoneNumber, t }) => (
  <Page title={t('title', data)}>
    {data.error && 'THURS AN URRUR, SON'}
    {data.people.map(person => (
      <PersonCard
        key={person.id}
        person={person}
        updatePerson={updatePerson}
        updateEmail={updateEmail}
        updatePhoneNumber={updatePhoneNumber}
      />
    ))}
    <PageNavBar
      root="people"
      page={page}
      perPage={PER_PAGE}
      totalRecords={data.totalPeople}
      currentRecords={data.people.length}
    />
  </Page>
);

People.propTypes = {
  data: PropTypes.shape({
    totalPeople: PropTypes.integer,
    people: PropTypes.arrayOf(personShape),
  }).isRequired,
  page: PropTypes.number.isRequired,
  updatePerson: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePhoneNumber: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  withPage,
  graphql(peopleQuery, {
    options: ({ page }) => ({
      variables: {
        offset: page * PER_PAGE,
        per_page: PER_PAGE,
      },
    }),
  }),
  graphql(updatePersonMutation, {
    props: ({ mutate }) => ({
      updatePerson({ id, first_name, last_name }) {
        return mutate({
          variables: { id, first_name, last_name },
          optimisticResponse: {
            __typename: 'Mutation',
            updatePerson: {
              __typename: 'Person',
              id,
              first_name,
              last_name,
            },
          },
        });
      },
    }),
  }),
  graphql(updateEmailMutation, {
    props: ({ mutate }) => ({
      updateEmail({ personId, emailId, values }) {
        return mutate({
          variables: { personId, emailId, values },
          optimisticResponse: {
            __typename: 'Mutation',
            updateEmail: {
              __typename: 'Email',
              id: emailId,
              address: values.address,
              location: values.location,
            },
          },
        });
      },
    }),
  }),
  graphql(updatePhoneNumberMutation, {
    props: ({ mutate }) => ({
      updatePhoneNumber({ personId, phoneNumberId, values }) {
        return mutate({
          variables: { personId, phoneNumberId, values },
          optimisticResponse: {
            __typename: 'Mutation',
            updatePhoneNumber: {
              __typename: 'PhoneNumber',
              id: phoneNumberId,
              number: values.number,
              location: values.location,
            },
          },
        });
      },
    }),
  }),
  placeholderLoader(),
  translate('people'),
)(People);
