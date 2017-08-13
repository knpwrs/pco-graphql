module Types
  AttachmentType = GraphQL::ObjectType.define do
    name "Attachment"
    description "An attachment for a Song."

    field :id, !types.ID, "The database ID of this attachment."
    field :filename, !types.String, "The filename of this attachment."
    field :url, !types.String, "The url of this attachment."
  end

  AttachmentInputType = GraphQL::InputObjectType.define do
    name "AttachmentInputType"
    description "Attributes for creating a Song."
    input_field :filename, !types.String, "The filename of the new attachment."
    input_field :url, !types.String, "The url of the new attachment."
  end
end
