import { makeAttributeResolvers } from './utils';

export const schema = [`
  type App {
    id: ID!

    # Attribute Types
    name: String!
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
