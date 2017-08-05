import {
  makeAttributeResolvers,
  makeLinkResolvers,
} from '../utils';
import {
  getTypeUrl,
  getResourceUrl,
  getQueryUrl,
} from '../../../api';

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

  input SongQueryArgs {
    author: String
    hidden: Boolean
    themes: String
    title: String
  }

  enum SongOrderBy {
    title
    created_at
    updated_at
  }

  extend type Query {
    song(id: ID!): Song
    songs(where: SongQueryArgs, order: SongOrderBy, desc: Boolean, offset: Int, per_page: Int): [Song]
    totalSongs: Int
  }
`];

export const resolvers = {
  Query: {
    song(root, { id }, { loader }) {
      return loader.load(getResourceUrl('services', 'songs', id));
    },
    songs(root, args, { loader }) {
      return loader.load(getQueryUrl('services', 'songs', args));
    },
    totalSongs: async (root, args, { rawLoader }) => {
      const data = await rawLoader.load(getTypeUrl('services', 'songs'));
      return data.meta.total_count;
    },
  },
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
