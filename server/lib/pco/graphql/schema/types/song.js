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

    # The administration organization of this song.
    admin: String
    # The author of this song.
    author: String
    # The ccli number of this song.
    ccli_number: Int
    # The copyright notice for this song.
    copyright: String
    # The date and time this song was created.
    created_at: String!
    # Indicates if this song is hidden.
    hidden: Boolean!
    # Themes associated with this song.
    themes: String
    # The title of this song.
    title: String
    # The date and date this song was last updated.
    updated_at: String

    # Attachments associated with this song.
    attachments: [Attachment]
  }

  # Arguments to search for songs by.
  input SongQueryArgs {
    # Search for songs matching a given author.
    author: String
    # Search for hidden or non-hidden songs.
    hidden: Boolean
    # Search for songs matching given themes.
    themes: String
    # Search for songs matching given title query.
    title: String
  }

  # Properties to sort songs by.
  enum SongOrderBy {
    title, created_at, updated_at
  }

  extend type Query {
    # Find a song with a given ID.
    song(id: ID!): Song
    # Find songs matching given parameters.
    songs(where: SongQueryArgs, order: SongOrderBy, desc: Boolean, offset: Int, per_page: Int): [Song]
    # The total number of songs.
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
