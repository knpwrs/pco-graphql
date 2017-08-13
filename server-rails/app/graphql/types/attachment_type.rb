module Types
  AttachmentType = GraphQL::ObjectType.define do
    name "Attachment"
    description "An attachment for a Song."

    global_id_field :id
    field :filename, !types.String, "The filename of this attachment."
    field :url, !types.String, "The url of this attachment."
  end
end
