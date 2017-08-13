module Types
  QueryType = GraphQL::ObjectType.define do
    name "Query"
    description "The root query type for our app schema."
    field :person, PersonType, field: Fields::FetchField.build(type: PersonType, model: Person)
  end
end
