import {
  makeAttributeResolvers,
} from '../utils';

export const typeDefs = [`
  # A file, whether it’s stored on Planning Center or linked from another location.
  type Attachment {
    id: ID!

    allow_mp3_download: Boolean!
    content_type: String
    created_at: String
    downloadable: Boolean!
    file_size: Int
    filename: String
    has_preview: Boolean!
    linked_url: String
    updated_at: String
    streamable: Boolean
    url: String
    thumbnail_url: String
  }
`];

export const resolvers = {
  Attachment: {
    ...makeAttributeResolvers([
      'allow_mp3_download',
      'content_type',
      'created_at',
      'downloadable',
      'file_size',
      'filename',
      'has_preview',
      'linked_url',
      'updated_at',
      'streamable',
      'url',
      'thumbnail_url',
    ]),
  },
};
