GraphSchema = GraphQL::Schema.define do
  query Types::QueryType
  mutation Types::MutationType
  lazy_resolve(Promise, :sync)
end
