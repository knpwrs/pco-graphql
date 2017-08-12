import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';
import { complement, path, compose, assoc, match, pickAll } from 'ramda';
import { translate } from 'react-i18next';
import { withState, withHandlers, branch, renderComponent } from 'recompose';
import { H3 } from '../typography';
import LightText from '../light-text';
import { personShape } from '../../shapes/people';

const cPath = complement(path);

const Flex = g.div({
  display: 'flex',
});

const Column = g.div(({ flex = 1 }) => ({
  flex,
}));

const FormatPhone = ({ number, location }) => {
  const [, area, prefix, line] = match(/.*(\d\d\d).*(\d\d\d).*(\d\d\d\d)/, number);
  return (
    <Flex>
      <Column>
        <LightText text={`${location}`} />
      </Column>
      <Column flex={3}>
        ({area}) {prefix}-{line}
      </Column>
    </Flex>
  );
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
      <FormatPhone key={id} {...props} />
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
      <Flex key={id}>
        <Column>
          <LightText text={location} />
        </Column>
        <Column flex={3}>
          {address}
        </Column>
      </Flex>
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

const inputBorder = color => ({
  borderBottom: `1px dashed ${color}`,
  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,
  ':focus,:active': {
    outline: 0,
  },
});

const PersonInput = g.input(({ head }, { lightBorderColor, h3, bodyText }) => ({
  ...(head ? h3 : bodyText),
  ...inputBorder(lightBorderColor),
}));

const PersonSelect = g.select((props, { bodyText, lightBorderColor }) => ({
  ...bodyText,
  ...inputBorder(lightBorderColor),
}));

const BarePersonNameForm = ({ values, onChange, onKeyDown }) => (
  <form>
    <PersonInput
      head
      name="first_name"
      value={values.first_name}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />{' '}
    <PersonInput
      head
      name="last_name"
      value={values.last_name}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  </form>
);

BarePersonNameForm.propTypes = {
  values: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

const PersonNameForm = compose(
  withState('values', 'setValues', ({ person }) => person),
  withHandlers({
    onChange: ({ setValues }) => ({ target }) => setValues(
      values => assoc(target.name, target.value, values),
    ),
    onKeyDown: ({ updatePerson, doneEditing, values }) => (e) => {
      if (e.keyCode === 27) doneEditing(); // Escape key
      if (e.keyCode !== 13) return; // Otherwise, not the enter key?
      e.preventDefault();
      updatePerson(values);
      doneEditing();
    },
  }),
)(BarePersonNameForm);

const phoneNumberLocations = ['Mobile', 'Home', 'Work', 'Pager', 'Fax', 'Skype', 'Other'];

const BarePhoneNumberForm = ({ values, setLocation, onChange, onKeyDown }) => (
  <form>
    <Flex>
      <Column>
        <PersonSelect
          name="location"
          value={values.location}
          onChange={setLocation}
          onKeyDown={onKeyDown}
        >
          {phoneNumberLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </PersonSelect>
      </Column>
      <Column flex={3}>
        <PersonInput
          name="number"
          value={values.number}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </Column>
    </Flex>
  </form>
);

BarePhoneNumberForm.propTypes = {
  values: PropTypes.shape({
    number: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
  setLocation: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

const PhoneNumberForm = compose(
  withState('values', 'setValues', ({ phoneNumber }) => pickAll(['location', 'number'], phoneNumber)),
  withHandlers({
    setLocation: ({ setValues, phoneNumber, person, updatePhoneNumber }) => ({ target }) => {
      setValues((values) => {
        const newValues = assoc(target.name, target.value, values);
        updatePhoneNumber({
          phoneNumberId: phoneNumber.id,
          personId: person.id,
          values: newValues,
        });
        return newValues;
      });
    },
    onChange: ({ setValues }) => ({ target }) => setValues(
      values => assoc(target.name, target.value, values),
    ),
    onKeyDown: ({ updatePhoneNumber, doneEditing, person, phoneNumber, values }) => (e) => {
      if (e.keyCode === 27) doneEditing(); // Escape key
      if (e.keyCode !== 13) return; // Otherwise, not the enter key?
      e.preventDefault();
      updatePhoneNumber({
        personId: person.id,
        phoneNumberId: phoneNumber.id,
        values,
      });
      doneEditing();
    },
  }),
)(BarePhoneNumberForm);

const EditPhoneNumbers = ({ person, updatePhoneNumber, doneEditing }) => (
  <div>
    {person.phone_numbers.map(pn => (
      <PhoneNumberForm
        key={pn.id}
        person={person}
        phoneNumber={pn}
        updatePhoneNumber={updatePhoneNumber}
        doneEditing={doneEditing}
      />
    ))}
  </div>
);

EditPhoneNumbers.propTypes = {
  person: personShape.isRequired,
  updatePhoneNumber: PropTypes.func.isRequired,
  doneEditing: PropTypes.func.isRequired,
};

const emailLocations = ['Home', 'Work', 'Other'];

const BareEmailForm = ({ values, setLocation, onChange, onKeyDown }) => (
  <form>
    <Flex>
      <Column>
        <PersonSelect
          name="location"
          value={values.location}
          onChange={setLocation}
          onKeyDown={onKeyDown}
        >
          {emailLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </PersonSelect>
      </Column>
      <Column flex={3}>
        <PersonInput
          name="address"
          value={values.address}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </Column>
    </Flex>
  </form>
);

BareEmailForm.propTypes = {
  values: PropTypes.shape({
    location: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  setLocation: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

const EmailForm = compose(
  withState('values', 'setValues', ({ email }) => pickAll(['location', 'address'], email)),
  withHandlers({
    setLocation: ({ setValues, email, person, updateEmail }) => ({ target }) => {
      setValues((values) => {
        const newValues = assoc(target.name, target.value, values);
        updateEmail({
          emailId: email.id,
          personId: person.id,
          values: newValues,
        });
        return newValues;
      });
    },
    onChange: ({ setValues }) => ({ target }) => setValues(
      values => assoc(target.name, target.value, values),
    ),
    onKeyDown: ({ updateEmail, doneEditing, person, email, values }) => (e) => {
      if (e.keyCode === 27) doneEditing(); // Escape key
      if (e.keyCode !== 13) return; // Otherwise, not the enter key?
      e.preventDefault();
      updateEmail({
        personId: person.id,
        emailId: email.id,
        values,
      });
      doneEditing();
    },
  }),
)(BareEmailForm);

const EditEmails = ({ person, updateEmail, doneEditing }) => (
  <div>
    {person.emails.map(e => (
      <EmailForm
        key={e.id}
        person={person}
        email={e}
        updateEmail={updateEmail}
        doneEditing={doneEditing}
      />
    ))}
  </div>
);

EditEmails.propTypes = {
  person: personShape.isRequired,
  updateEmail: PropTypes.func.isRequired,
  doneEditing: PropTypes.func.isRequired,
};

const BareEditPerson = ({
  person,
  updatePerson,
  updateEmail,
  updatePhoneNumber,
  doneEditing,
  onDoubleClick,
}) => (
  <div onDoubleClick={onDoubleClick}>
    <PersonNameForm
      person={person}
      updatePerson={updatePerson}
      doneEditing={doneEditing}
    />
    <Flex>
      <Column>
        <EditEmails
          person={person}
          updateEmail={updateEmail}
          doneEditing={doneEditing}
        />
      </Column>
      <Column>
        <EditPhoneNumbers
          person={person}
          updatePhoneNumber={updatePhoneNumber}
          doneEditing={doneEditing}
        />
      </Column>
    </Flex>
  </div>
);

BareEditPerson.propTypes = {
  person: personShape.isRequired,
  updatePerson: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePhoneNumber: PropTypes.func.isRequired,
  doneEditing: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

const EditPerson = withHandlers({
  onDoubleClick: ({ doneEditing }) => () => doneEditing(),
})(BareEditPerson);

const BarePersonInfo = ({
  person,
  updatePerson,
  updateEmail,
  updatePhoneNumber,
  editing,
  toggleEditing,
}) => (
  editing ? (
    <EditPerson
      person={person}
      updatePerson={updatePerson}
      updateEmail={updateEmail}
      updatePhoneNumber={updatePhoneNumber}
      doneEditing={toggleEditing}
    />
  ) : (
    <div onDoubleClick={toggleEditing}>
      <H3>{person.first_name} {person.last_name}</H3>
      <Flex>
        <Column>
          <EmailAddresses person={person} />
        </Column>
        <Column>
          <PhoneNumbers person={person} />
        </Column>
      </Flex>
    </div>
  )
);

BarePersonInfo.propTypes = {
  person: personShape.isRequired,
  updatePerson: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePhoneNumber: PropTypes.func.isRequired,
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
