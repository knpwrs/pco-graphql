module Types
  MutationType = GraphQL::ObjectType.define do
    name "Mutation"
    description "The root mutation type for our app schema."

    field :addPerson do
      type PersonType
      argument :attributes, !PersonInputType
      description "Add a Person."
      resolve ->(obj, args, ctx) { Person.create(args[:attributes].to_h) }
    end
  end
end
