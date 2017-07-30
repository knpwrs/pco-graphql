import { makeAttributeResolvers } from '../utils';

export const typeDefs = [`
  type Email {
    id: ID!

    # Attribute Types
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
