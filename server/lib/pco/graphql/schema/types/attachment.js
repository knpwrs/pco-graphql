import {
  makeAttributeResolvers,
} from '../utils';

export const typeDefs = [`
  # A file, whether it’s stored on Planning Center or linked from another location.
  type Attachment {
    id: ID!

    # Indicates if mp3 downloads are allowed for this attachment.
    allow_mp3_download: Boolean!
    # The content type of this attachment.
    content_type: String
    # The date and time this attachment was created.
    created_at: String
    # Indicates if this attachment is downloadable.
    downloadable: Boolean!
    # The file size of this attachment.
    file_size: Int
    # The filename of this attachment.
    filename: String
    # Indicates if this attachment has a preview.
    has_preview: Boolean!
    # The link url for this attachment.
    linked_url: String
    # The date and time this attachment was last updated.
    updated_at: String
    # Indicates if this attachment is streamable.
    streamable: Boolean
    # The url of this attachment.
    url: String
    # A url to a thumbnail for this attachment.
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
