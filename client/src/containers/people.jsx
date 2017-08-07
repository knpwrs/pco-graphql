import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { pathOr, compose } from 'ramda';
import g, { Div } from 'glamorous';
import Page from '../components/page';
import Card from '../components/card';
import PageNavBar from '../components/page-nav-bar';
import withPage from '../util/with-page';
import { placeholderLoader } from '../components/loader';

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

const personShape = PropTypes.shape({
  id: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  phone_numbers: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.string,
  })),
  emails: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string,
  })),
});

const PhoneNumberSpan = ({ person }) => (
  <span>{pathOr('No Phone Number', ['phone_numbers', 0, 'number'], person)}</span>
);

PhoneNumberSpan.propTypes = {
  person: personShape.isRequired,
};

const EmailAddressSpan = ({ person }) => (
  <span>{pathOr('No Email Address', ['emails', 0, 'address'], person)}</span>
);

EmailAddressSpan.propTypes = {
  person: personShape.isRequired,
};

const Column = g.div({
  flex: 1,
});

const PersonInfo = ({ person }) => (
  <Div display="flex">
    <Column>
      <EmailAddressSpan person={person} />
    </Column>
    <Column>
      <PhoneNumberSpan person={person} />
    </Column>
  </Div>
);

PersonInfo.propTypes = {
  person: personShape.isRequired,
};

const PersonCard = ({ person }) => (
  <Card title={`${person.first_name} ${person.last_name}`}>
    <PersonInfo person={person} />
  </Card>
);

PersonCard.propTypes = {
  person: personShape.isRequired,
};

const People = ({ data, page }) => (
  <Page title={`People (${data.totalPeople})`}>
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
)(People);
