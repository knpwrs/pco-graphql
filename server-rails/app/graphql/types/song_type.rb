module Types
  SongType = GraphQL::ObjectType.define do
    name "Song"
    description "A song in our application."

    field :id, !types.ID, "The Database ID of this song."
    field :author, !types.String, "The author of this song."
    field :title, !types.String, "The title of this song."
    field :ccli, !types.String, "The CCLI number of this song."
    field :attachments, types[AttachmentType], "Attachments on this song."
  end
end
