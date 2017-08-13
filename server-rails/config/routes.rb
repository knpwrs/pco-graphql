Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/queries"
  root to: redirect("/graphiql")
  resources :queries
end
