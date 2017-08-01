import { makeAttributeResolvers } from '../utils';

export const typeDefs = [`
  # An email represents an email address and location.
  type Email {
    id: ID!

    address: String!
    location: String!
    primary: Boolean!
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
};
