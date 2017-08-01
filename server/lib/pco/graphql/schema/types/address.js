import { makeAttributeResolvers } from '../utils';

export const typeDefs = [`
  # An address represents a physical and/or mailing address for a person.
  type Address {
    id: ID!
    city: String
    location: String
    primary: Boolean
    state: String
    street: String
    zip: String
  }
`];

export const resolvers = {
  Address: {
    ...makeAttributeResolvers([
      'id',
      'city',
      'location',
      'primary',
      'state',
      'street',
      'zip',
    ]),
  },
};
