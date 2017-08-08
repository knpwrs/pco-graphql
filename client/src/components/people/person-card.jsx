import React from 'react';
import PersonInfo from './person-info';
import Card from '../card';
import { personShape } from '../../shapes/people';

const PersonCard = ({ person }) => (
  <Card title={`${person.first_name} ${person.last_name}`}>
    <PersonInfo person={person} />
  </Card>
);

PersonCard.propTypes = {
  person: personShape.isRequired,
};

export default PersonCard;
