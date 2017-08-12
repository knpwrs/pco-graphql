import debug from 'debug';
import { makeAttributeResolvers } from '../utils';
import { getResourceUrl } from '../../../api';

const d = debug('app:graphql:phonenumber');

export const typeDefs = [`
  # An email represents an email address and location.
  type Email {
    id: ID!

    address: String!
    location: String!
    primary: Boolean!
  }

  input EmailAttributes {
    address: String!
    location: EmailLocation!
    primary: Boolean
  }

  enum EmailLocation {
    Home, Work, Other
  }

  extend type Mutation {
    addEmail(personId: ID!, attributes: EmailAttributes!): Email
    updateEmail(personId: ID!, emailId: ID!, attributes: EmailAttributes!): Email
    deleteEmail(emailId: ID!): Boolean
  }
`];

export const resolvers = {
  Email: {
    ...makeAttributeResolvers([
      'address',
      'location',
      'primary',
    ]),
  },
  Mutation: {
    addEmail: async (root, { personId, attributes }, { post }) => {
      d(`Adding an email to person ${personId}.`);
      d(attributes);
      const personUrl = getResourceUrl('people', 'people', personId);
      const { data } = await post(`${personUrl}/emails`, {
        type: 'Email',
        attributes,
      });
      d('Email added.');
      d(data);
      return data;
    },
    updateEmail: async (root, { personId, emailId, attributes }, { patch }) => {
      d(`Updating email ${emailId} on person ${personId}.`);
      d(attributes);
      const personUrl = getResourceUrl('people', 'people', personId);
      const { data } = await patch(`${personUrl}/emails/${emailId}`, {
        type: 'Email',
        attributes,
      });
      d('Email updated.');
      d(data);
      return data;
    },
    deleteEmail: async (root, { emailId, attributes }, { del }) => {
      d(`Deleting email ${emailId}.`);
      d(attributes);
      // Deleting emails uses the email resource directly instead of the email sub-resource
      const emailUrl = getResourceUrl('people', 'emails', emailId);
      const { data } = await del(emailUrl);
      d('Email deleted.');
      d(data);
      return true;
    },
  },
};
