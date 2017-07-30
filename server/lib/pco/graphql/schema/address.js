import { prop } from 'ramda';

export const schema = [`
  type Address {
    id: ID!
    attributes: AddressAttributes
  }

  type AddressAttributes {
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
    attributes: prop('attributes'),
  },
};
