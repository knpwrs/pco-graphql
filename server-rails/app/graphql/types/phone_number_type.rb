module Types
  PhoneNumberType = GraphQL::ObjectType.define do
    name "PhoneNumber"
    description "A phone number belonging to a person in our app."

    global_id_field :id
    field :number, !types.String, "The actual phone number."
    field :location, !types.String, "The location for this phone numbers."
  end
end
