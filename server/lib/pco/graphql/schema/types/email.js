import debug from 'debug';
import { makeAttributeResolvers } from '../utils';
import { getResourceUrl } from '../../../api';

const d = debug('app:graphql:phonenumber');

export const typeDefs = [`
  # An email represents an email address and location.
  type Email {
    id: ID!

    # The actual email address.
    address: String!
    # The location (home, work, etc) associated with this email.
    location: String!
    # Indicates if this email is a person's primary email.
    primary: Boolean!
  }

  # Attributes for creating new emails.
  input EmailAttributes {
    # The actual email address.
    address: String!
    # The location (home, work, etc) associated with this email.
    location: EmailLocation!
    # Indicates if this email is a person's primary email.
    primary: Boolean
  }

  # An enumeration of possible email locations.
  enum EmailLocation {
    Home, Work, Other
  }

  extend type Mutation {
    # Add an email to a person with the given ID.
    addEmail(personId: ID!, attributes: EmailAttributes!): Email
    # Change an email on a person with the given ID.
    updateEmail(personId: ID!, emailId: ID!, attributes: EmailAttributes!): Email
    # Delete an email with a given ID.
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
