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
        number
      }
      emails {
        address
      }
    }
  }
`;

const People = ({ data, page, t }) => (
  <Page title={t('title', data)}>
    {data.people.map(person => <PersonCard key={person.id} person={person} />)}
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
  placeholderLoader(),
  translate('people'),
)(People);
