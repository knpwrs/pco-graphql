import debug from 'debug';
import { makeAttributeResolvers } from '../utils';
import { getResourceUrl } from '../../../api';

const d = debug('app:graphql:phonenumber');

export const typeDefs = [`
  # A phone number represents a single telephone number and location.
  type PhoneNumber {
    id: ID!

    # The carrier associated with this phone number.
    carrier: String!
    # The date and time this phone number was created at.
    created_at: String!
    # The location associated with this phone number (Mobile, Home, Work, etc).
    location: String!
    # The actual phone number.
    number: String!
    # Indicates if this phone number is a person's primary phone number.
    primary: Boolean!
    # The date and time this phone number was last updated.
    updated_at: String!
  }

  # Attributes to create a new phone number.
  input PhoneNumberAttributes {
    # The carrier associated with this phone number.
    carrier: String
    # The location associated with this phone number (Mobile, Home, Work, etc).
    location: PhoneNumberLocation!
    # The actual phone number.
    number: String!
    # Indicates if this phone number is a person's primary phone number.
    primary: Boolean
  }

  # Possible locations for phone numbers.
  enum PhoneNumberLocation {
    Mobile, Home, Work, Pager, Fax, Skype, Other
  }

  extend type Mutation {
    # Add a phone number to the person with a given ID.
    addPhoneNumber(personId: ID!, attributes: PhoneNumberAttributes!): PhoneNumber
    # Update a phone number on a person with a given ID.
    updatePhoneNumber(personId: ID!, phoneNumberId: ID!, attributes: PhoneNumberAttributes!): PhoneNumber
    # Delete a phone number for a person with a given ID.
    deletePhoneNumber(personId: ID!, phoneNumberId: ID!): Boolean
  }
`];

export const resolvers = {
  PhoneNumber: {
    ...makeAttributeResolvers([
      'carrier',
      'created_at',
      'location',
      'number',
      'primary',
      'updated_at',
    ]),
  },
  Mutation: {
    addPhoneNumber: async (root, { personId, attributes }, { post }) => {
      d(`Adding a phone number to person ${personId}.`);
      d(attributes);
      const personUrl = getResourceUrl('people', 'people', personId);
      const { data } = await post(`${personUrl}/phone_numbers`, {
        type: 'PhoneNumber',
        attributes,
      });
      d('Phone number added.');
      d(data);
      return data;
    },
    updatePhoneNumber: async (root, { personId, phoneNumberId, attributes }, { patch }) => {
      d(`Updating phone number ${phoneNumberId} on person ${personId}.`);
      d(attributes);
      const personUrl = getResourceUrl('people', 'people', personId);
      const { data } = await patch(`${personUrl}/phone_numbers/${phoneNumberId}`, {
        type: 'PhoneNumber',
        attributes,
      });
      d('Phone number updated.');
      d(data);
      return data;
    },
    deletePhoneNumber: async (root, { personId, phoneNumberId, attributes }, { del }) => {
      d(`Deleting phone number ${phoneNumberId} on person ${personId}.`);
      d(attributes);
      const personUrl = getResourceUrl('people', 'people', personId);
      const { data } = await del(`${personUrl}/phone_numbers/${phoneNumberId}`);
      d('Phone number deleted.');
      d(data);
      return true;
    },
  },
};
