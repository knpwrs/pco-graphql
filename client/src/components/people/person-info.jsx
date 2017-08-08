import React from 'react';
import g, { Div } from 'glamorous';
import { pathOr } from 'ramda';
import LightText from '../light-text';
import { personShape } from '../../shapes/people';

const Column = g.div({
  flex: 1,
});

const PhoneNumberSpan = ({ person }) => (
  <span>{pathOr(<LightText text="No Phone Number" />, ['phone_numbers', 0, 'number'], person)}</span>
);

PhoneNumberSpan.propTypes = {
  person: personShape.isRequired,
};

const EmailAddressSpan = ({ person }) => (
  <span>{pathOr(<LightText text="No Email Address" />, ['emails', 0, 'address'], person)}</span>
);

EmailAddressSpan.propTypes = {
  person: personShape.isRequired,
};

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

export default PersonInfo;
