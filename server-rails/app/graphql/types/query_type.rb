module Types
  QueryType = GraphQL::ObjectType.define do
    name "Query"
    description "The root query type for our app schema."

    field :person do
      type PersonType
      argument :id, !types.ID
      description "Find a Person by ID."
      resolve ->(obj, args, ctx) { Person.find(args["id"]) }
    end

    field :people do
      type types[PersonType]
      argument :limit, types.Int, :default_value => 10
      description "Find people."
      resolve ->(obj, args, ctx) { Person.limit(args["limit"]) }
    end

    field :song do
      type SongType
      argument :id, !types.ID
      description "Find a Song by ID."
      resolve ->(obj, args, ctx) { Song.find(args["id"]) }
    end

    field :songs do
      type types[SongType]
      argument :limit, types.Int, :default_value => 10
      description "Find songs."
      resolve ->(obj, args, ctx) { Song.limit(args["limit"]) }
    end
  end
end
