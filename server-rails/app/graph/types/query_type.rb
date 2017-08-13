module Types
  QueryType = GraphQL::ObjectType.define do
    name "Query"
    description "The root query type for our app schema."
    field :person do
      type PersonType
      argument :id, !types.ID
      description "Find a Person by ID."
      resolve ->(obj, args, ctx) { Person.find(args["id"]) }
      resolve ->(obj, args, ctx) { Person.find(args["id"]) }
    end
  end
end
