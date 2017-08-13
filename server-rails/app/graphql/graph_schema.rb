GraphSchema = GraphQL::Schema.define do
  query Types::QueryType

  resolve_type ->(obj, ctx) do
    case obj
    when Person
      Types::PersonType
    else
      raise("No GraphQL type for #{obj.class.name}")
    end
  end

  # See https://github.com/rmosolgo/graphql-ruby/blob/90471c8767b6ece1823fed15817c8dbd783f2af1/guides/relay/object_identification.md
  object_from_id ->(id, ctx) do
    type_name, item_id = GraphQL::Schema::UniqueWithinType.decode(id)
    type_name.constantize.find(item_id)
  end

  id_from_object -> (object, type_definition, ctx) do
    GraphQL::Schema::UniqueWithinType.encode(type_definition.name, object.id)
  end
end
