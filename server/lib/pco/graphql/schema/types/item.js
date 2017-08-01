import {
  makeRelationshipResolvers,
  makeAttributeResolvers,
} from '../utils';

export const typeDefs = [`
  type Item {
    id: ID!

    # Attribute Types
    created_at: String!
    item_type: String
    title: String

    # Linked Types
    song: Song
  }
`];

export const resolvers = {
  Item: {
    ...makeAttributeResolvers([
      'created_at',
      'item_type',
      'title',
    ]),
    ...makeRelationshipResolvers([
      ['song', 'services', 'songs'],
    ]),
  },
};
