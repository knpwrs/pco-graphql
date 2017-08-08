import React from 'react';
import PropTypes from 'prop-types';
import g, { Div } from 'glamorous';
import { pathOr } from 'ramda';
import { translate } from 'react-i18next';
import LightText from '../light-text';
import { personShape } from '../../shapes/people';

const Column = g.div({
  flex: 1,
});

const BarePhoneNumberSpan = ({ person, t }) => (
  <span>{pathOr(<LightText text={t('noPhone')} />, ['phone_numbers', 0, 'number'], person)}</span>
);

BarePhoneNumberSpan.propTypes = {
  person: personShape.isRequired,
  t: PropTypes.func.isRequired,
};

const PhoneNumberSpan = translate('people')(BarePhoneNumberSpan);

const BareEmailAddressSpan = ({ person, t }) => (
  <span>{pathOr(<LightText text={t('noEmail')} />, ['emails', 0, 'address'], person)}</span>
);

BareEmailAddressSpan.propTypes = {
  person: personShape.isRequired,
  t: PropTypes.func.isRequired,
};

const EmailAddressSpan = translate('people')(BareEmailAddressSpan);

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
