import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent, compose } from 'recompose';
import { pathOr } from 'ramda';
import g, { Div } from 'glamorous';
import Page from '../components/page';
import Card from '../components/card';

const peopleQuery = gql`
  query PeopleQuery {
    totalPeople
    people(order: first_name, per_page: 25) {
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

const People = ({ data }) => (
  <Page title={`People (${data.totalPeople})`}>
    {data.people.map(person => <PersonCard key={person.id} person={person} />)}
  </Page>
);

People.propTypes = {
  data: PropTypes.shape({
    totalPeople: PropTypes.integer,
    people: PropTypes.arrayOf(personShape),
  }).isRequired,
};

const placeholder = branch(
  ({ data }) => data.loading,
  renderComponent(props => (
    <Div {...props} backgroundColor="#F3F3F3" textAlign="center" width="100%" height="100%" />
  )),
);

export default compose(
  graphql(peopleQuery),
  placeholder,
)(People);
