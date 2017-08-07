import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent, withProps } from 'recompose';
import { pathOr, compose, merge, evolve, clamp } from 'ramda';
import g, { Div } from 'glamorous';
import qs from 'qs';
import Page from '../components/page';
import Card from '../components/card';
import PageNavBar from '../components/page-nav-bar';

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

const placeholder = branch(
  ({ data }) => data.loading,
  renderComponent(props => (
    <Div {...props} backgroundColor="#F3F3F3" textAlign="center" width="100%" height="100%" />
  )),
);

const parseQueryArgs = compose(
  evolve({ page: compose(clamp(0, Infinity), parseInt) }),
  merge({ page: 0 }),
  qs.parse,
  search => search.substr(1),
);

export default compose(
  withProps(({ location }) => ({
    page: parseQueryArgs(location.search).page,
  })),
  graphql(peopleQuery, {
    options: ({ page }) => ({
      variables: {
        offset: page * PER_PAGE,
        per_page: PER_PAGE,
      },
    }),
  }),
  placeholder,
)(People);
