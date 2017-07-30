import { makeAttributeResolvers } from './utils';

export const schema = [`
  type PhoneNumber {
    id: ID!

    # Attribute Types
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
