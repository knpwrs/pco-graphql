import { makeLinkResolvers, makeAttributeResolvers } from '../utils';

export const typeDefs = [`
  type Item {
    id: ID!

    # Attribute Types
    created_at: String!
    item_type: String
    title: String

    # Linked Types
  }
`];

export const resolvers = {
  Item: {
    ...makeAttributeResolvers([
      'created_at',
      'item_type',
      'title',
    ]),
    ...makeLinkResolvers([
    ]),
  },
};
