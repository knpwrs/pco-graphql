module Types
  EmailType = GraphQL::ObjectType.define do
    name "Email"
    description "An email address belonging to a person in our app."

    global_id_field :id
    field :address, !types.String, "The actual email address."
    field :location, !types.String, "The location for this email address."
  end
end
