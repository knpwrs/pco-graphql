module Types
  PersonType = GraphQL::ObjectType.define do
    name "Person"
    description "A person in our application."

    global_id_field :id
    field :first_name, !types.String, "The first name of this person."
    field :last_name, !types.String, "The last name of this person."
  end
end
