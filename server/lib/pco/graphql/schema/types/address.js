import { makeAttributeResolvers } from '../utils';

export const typeDefs = [`
  # An address represents a physical and/or mailing address for a person.
  type Address {
    id: ID!
    # The location (home, work, etc) associated with this address.
    location: String
    # Indicates if this is a person's primary address.
    primary: Boolean
    # The street associated with this address.
    street: String
    # The city associated with this address.
    city: String
    # The zip code associated with this address.
    zip: String
    # The state associated with this address.
    state: String
  }
`];

export const resolvers = {
  Address: {
    ...makeAttributeResolvers([
      'id',
      'location',
      'primary',
      'street',
      'city',
      'zip',
      'state',
    ]),
  },
};
