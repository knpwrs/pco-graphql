import {
  makeRelationshipResolvers,
  makeAttributeResolvers,
} from '../utils';

export const typeDefs = [`
  # An Item in a Plan.
  type Item {
    id: ID!

    created_at: String!
    item_type: String
    title: String

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
