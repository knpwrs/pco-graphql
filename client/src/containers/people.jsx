import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent, compose } from 'recompose';
import { Div } from 'glamorous';
import Page from '../components/page';

const peopleQuery = gql`
  query PeopleQuery {
    totalPeople
    people(order: first_name, per_page: 25) {
      id
      first_name
      last_name
    }
  }
`;

const personShape = PropTypes.shape({
  id: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
});

const Person = ({ person }) => (
  <div>
    <h3>{person.first_name} {person.last_name}</h3>
  </div>
);

Person.propTypes = {
  person: personShape.isRequired,
};

const People = ({ data }) => (
  <Page title={`People (${data.totalPeople})`}>
    {data.people.map(person => <Person key={person.id} person={person} />)}
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
