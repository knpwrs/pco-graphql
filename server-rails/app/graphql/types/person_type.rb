module Types
  PersonType = GraphQL::ObjectType.define do
    name "Person"
    description "A person in our application."

    field :id, !types.ID, "The database ID of this person."
    field :first_name, !types.String, "The first name of this person."
    field :last_name, !types.String, "The last name of this person."
    field :phone_numbers, types[PhoneNumberType] do
      description "Phone numbers for this person."
      resolve ->(person, args, ctx) do
        BatchLoader.for(person.phone_number_ids).batch do |phone_number_ids, batch_loader|
          PhoneNumber.where(id: phone_number_ids).each { |phone_number| batch_loader.load(phone_number.id, phone_number) }
        end
      end
    end
    field :emails, types[EmailType] do
      description "Emails for this person."
      resolve ->(person, args, ctx) do
        BatchLoader.for(person.email_ids).batch do |email_ids, batch_loader|
          Email.where(id: email_ids).each { |email| batch_loader.load(email.id, email) }
        end
      end
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
