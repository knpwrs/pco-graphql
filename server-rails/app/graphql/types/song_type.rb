module Types
  SongType = GraphQL::ObjectType.define do
    name "Song"
    description "A song in our application."

    field :id, !types.ID, "The Database ID of this song."
    field :title, !types.String, "The title of this song."
    field :author, !types.String, "The author of this song."
    field :ccli_number, !types.String, "The CCLI number of this song."
    field :attachments, types[AttachmentType] do
      description "Attachments on this song."
      resolve ->(person, args, ctx) {
        ctx[:attachment_loader].load_many(person.attachment_ids)
      }
    end
  end

  SongInputType = GraphQL::InputObjectType.define do
    name "SongInputType"
    description "Attributes for creating a Song."
    input_field :title, !types.String, "The title of the new song."
    input_field :author, !types.String, "The author of the new song."
    input_field :ccli_number, !types.String, "The CCLI number of the new song."
    input_field :attachments_attributes, types[AttachmentInputType], "Attachments for the new song."
  end
end
