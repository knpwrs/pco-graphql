import {
  makeAttributeResolvers,
  makeLinkResolvers,
} from '../utils';

export const typeDefs = [`
  # A song
  type Song {
    id: ID!

    admin: String
    author: String
    ccli_number: Int
    copyright: String
    created_at: String!
    hidden: Boolean!
    themes: String
    title: String
    updated_at: String

    attachments: [Attachment]
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
    ...makeLinkResolvers([
      'attachments',
    ]),
  },
};
