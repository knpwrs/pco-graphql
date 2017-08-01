import { makeAttributeResolvers } from '../utils';

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
};
