import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import PersonInfo from './person-info';
import Card from '../card';
import { personShape } from '../../shapes/people';

const BarePersonCard = ({ person, updatePerson, updateEmail, updatePhoneNumber }) => (
  <Card title={`${person.first_name} ${person.last_name}`}>
    <PersonInfo
      person={person}
      updatePerson={updatePerson}
      updateEmail={updateEmail}
      updatePhoneNumber={updatePhoneNumber}
    />
  </Card>
);

BarePersonCard.propTypes = {
  person: personShape.isRequired,
  updatePerson: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePhoneNumber: PropTypes.func.isRequired,
};

export default pure(BarePersonCard);
