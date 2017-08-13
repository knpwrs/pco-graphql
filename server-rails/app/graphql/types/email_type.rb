module Types
  EmailType = GraphQL::ObjectType.define do
    name "Email"
    description "An email address belonging to a person in our app."

    field :id, !types.ID, "The database ID of this email address."
    field :address, !types.String, "The actual email address."
    field :location, !types.String, "The location for this email address."
  end

  EmailInputType = GraphQL::InputObjectType.define do
    name "EmailInputType"
    description "Attributes for creating an Email Address"
    input_field :address, !types.String, "The actual email address."
    input_field :location, !types.String, "The location for the new email address."
  end
end
