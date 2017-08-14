import {
  makeRelationshipResolvers,
  makeAttributeResolvers,
} from '../utils';

export const typeDefs = [`
  # An Item in a Plan.
  type Item {
    id: ID!

    # Date and time this plan item was created.
    created_at: String!
    # The type of this plan item.
    item_type: String
    # The title of this plan item.
    title: String

    # A song associated with this plan item.
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
      { key: 'song', api: 'services', resource: 'songs' },
    ]),
  },
};
