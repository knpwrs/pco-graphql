import React from 'react';
import PropTypes from 'prop-types';
import g, { Div } from 'glamorous';
import { complement, path, compose, assoc, match } from 'ramda';
import { translate } from 'react-i18next';
import { withState, withHandlers, branch, renderComponent } from 'recompose';
import { H3 } from '../typography';
import LightText from '../light-text';
import { personShape } from '../../shapes/people';

const cPath = complement(path);

const Column = g.div({
  flex: 1,
});

const FormatPhone = ({ number, location }) => {
  const [, area, prefix, line] = match(/.*(\d\d\d).*(\d\d\d).*(\d\d\d\d)/, number);
  return <span>({area}) {prefix}-{line} <LightText text={`${location}`} /></span>;
};

FormatPhone.propTypes = {
  number: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

const NoPhoneNumber = translate('people')(({ t }) => <LightText text={t('noPhone')} />);
const NoEmailAddress = translate('people')(({ t }) => <LightText text={t('noEmail')} />);

const BarePhoneNumbers = ({ person }) => (
  <div>
    {person.phone_numbers.map(({ id, ...props }) => (
      <div key={id}>
        <FormatPhone {...props} />
      </div>
    ))}
  </div>
);

BarePhoneNumbers.propTypes = {
  person: personShape.isRequired,
};

const PhoneNumbers = branch(
  cPath(['person', 'phone_numbers', 'length']),
  renderComponent(NoPhoneNumber),
)(BarePhoneNumbers);

const BareEmailAddresses = ({ person }) => (
  <div>
    {person.emails.map(({ id, address, location }) => (
      <div key={id}>{address} <LightText text={location} /></div>
    ))}
  </div>
);

BareEmailAddresses.propTypes = {
  person: personShape.isRequired,
};

const EmailAddresses = branch(
  cPath(['person', 'emails', 'length']),
  renderComponent(NoEmailAddress),
)(BareEmailAddresses);

const PersonInput = g.input((props, { borderLight, h3 }) => ({
  ...h3,
  fontSize: '1.17em',
  borderBottom: `1px dashed ${borderLight}`,
  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,
  ':focus,:active': {
    outline: 0,
  },
}));

const BarePersonForm = ({ values, onChange, onKeyDown, onDoubleClick }) => (
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  <form onKeyDown={onKeyDown} onDoubleClick={onDoubleClick}>
    <PersonInput
      name="first_name"
      value={values.first_name}
      onChange={onChange}
    />{' '}
    <PersonInput
      name="last_name"
      value={values.last_name}
      onChange={onChange}
    />
  </form>
  /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
);

BarePersonForm.propTypes = {
  values: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

const PersonForm = compose(
  withState('values', 'setValues', ({ person }) => person),
  withHandlers({
    onChange: ({ setValues }) => ({ target }) => setValues(
      values => assoc(target.name, target.value, values),
    ),
    onKeyDown: ({ updatePerson, doneEditing, values }) => ({ keyCode }) => {
      if (keyCode === 27) doneEditing(); // Escape key
      if (keyCode !== 13) return; // Otherwise, not the enter key?
      updatePerson(values);
      doneEditing();
    },
    onDoubleClick: ({ doneEditing }) => () => doneEditing(),
  }),
)(BarePersonForm);

const BarePersonInfo = ({ person, updatePerson, editing, toggleEditing }) => (
  editing ? (
    <PersonForm person={person} updatePerson={updatePerson} doneEditing={toggleEditing} />
  ) : (
    <div onDoubleClick={toggleEditing}>
      <H3>{person.first_name} {person.last_name}</H3>
      <Div display="flex">
        <Column>
          <EmailAddresses person={person} />
        </Column>
        <Column>
          <PhoneNumbers person={person} />
        </Column>
      </Div>
    </div>
  )
);

BarePersonInfo.propTypes = {
  person: personShape.isRequired,
  updatePerson: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  toggleEditing: PropTypes.func.isRequired,
};

const PersonInfo = compose(
  withState('editing', 'setEditing', false),
  withHandlers({
    toggleEditing: ({ editing, setEditing }) => () => setEditing(!editing),
  }),
)(BarePersonInfo);

export default PersonInfo;
