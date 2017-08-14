import { makeAttributeResolvers } from '../utils';

export const typeDefs = [`
  # An app is one of the handful of apps that PCO offers that organizations
  # can subscribe to, e.g. Services, Registrations, etc.
  type App {
    id: ID!

    # The name of this app.
    name: String!
    # The url of this app.
    url: String!
  }
`];

export const resolvers = {
  App: {
    ...makeAttributeResolvers([
      'name',
      'url',
    ]),
  },
};
