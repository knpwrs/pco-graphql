module Types
  PersonType = GraphQL::ObjectType.define do
    name "Person"
    description "A person in our application."

    field :id, !types.ID, "The database ID of this person."
    field :first_name, !types.String, "The first name of this person."
    field :last_name, !types.String, "The last name of this person."
    field :phone_numbers, types[PhoneNumberType] do
      description "Phone numbers for this person."
      resolve ->(person, args, ctx) {
        ctx[:phone_number_loader].load_many(person.phone_number_ids)
      }
    end
    field :emails, types[EmailType] do
      description "Emails for this person."
      resolve ->(person, args, ctx) {
        ctx[:email_loader].load_many(person.email_ids)
      }
    end
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
