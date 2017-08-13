module Types
  AttachmentType = GraphQL::ObjectType.define do
    name "Attachment"
    description "An attachment for a Song."

    field :id, !types.ID, "The database ID of this attachment."
    field :filename, !types.String, "The filename of this attachment."
    field :url, !types.String, "The url of this attachment."
  end
end
