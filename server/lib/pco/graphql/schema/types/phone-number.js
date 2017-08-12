import debug from 'debug';
import { makeAttributeResolvers } from '../utils';
import { getResourceUrl } from '../../../api';

const d = debug('app:graphql:phonenumber');

export const typeDefs = [`
  # A phone number represents a single telephone number and location.
  type PhoneNumber {
    id: ID!

    carrier: String!
    created_at: String!
    location: String!
    number: String!
    primary: Boolean!
    updated_at: String!
  }

  input PhoneNumberAttributes {
    carrier: String
    location: PhoneNumberLocation!
    number: String!
    primary: Boolean
  }

  enum PhoneNumberLocation {
    Mobile, Home, Work, Pager, Fax, Skype, Other
  }

  extend type Mutation {
    addPhoneNumber(personId: ID!, attributes: PhoneNumberAttributes!): PhoneNumber
    updatePhoneNumber(personId: ID!, phoneNumberId: ID!, attributes: PhoneNumberAttributes!): PhoneNumber
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
