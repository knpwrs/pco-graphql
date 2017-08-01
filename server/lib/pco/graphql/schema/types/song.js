import {
  makeAttributeResolvers,
} from '../utils';

export const typeDefs = [`
  # A song
  type Song {
    id: ID!

    # Attribute Types
    admin: String
    author: String
    ccli_number: Int
    copyright: String
    created_at: String!
    hidden: Boolean!
    themes: String
    title: String
    updated_at: String
  }
`];

export const resolvers = {
  Song: {
    ...makeAttributeResolvers([
      'admin',
      'author',
      'ccli_number',
      'copyright',
      'created_at',
      'hidden',
      'themes',
      'title',
      'updated_at',
    ]),
  },
};
