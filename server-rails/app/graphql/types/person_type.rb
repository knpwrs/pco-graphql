module Types
  PersonType = GraphQL::ObjectType.define do
    name "Person"
    description "A person in our application."

    field :id, !types.ID, "The database ID of this person."
    field :first_name, !types.String, "The first name of this person."
    field :last_name, !types.String, "The last name of this person."
    field :phone_numbers, types[PhoneNumberType], "Phone numbers for this person."
    field :emails, types[EmailType], "Emails for this person."
  end

  PersonInputType = GraphQL::InputObjectType.define do
    name "PersonInputType"
    description "Attributes for creating a Person"
    input_field :first_name, !types.String, "The first name of the new person."
    input_field :last_name, !types.String, "The last name of the new person."
    input_field :phone_numbers_attributes, types[PhoneNumberInputType], "Phone numbers for this new person."
    input_field :emails_attributes, types[EmailInputType], "Phone numbers for this new person."
  end
end
