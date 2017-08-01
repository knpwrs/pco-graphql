import { makeLinkResolvers, makeAttributeResolvers } from '../utils';

export const typeDefs = [`
  type Plan {
    id: ID!

    # Attribute Types
    created_at: String!
    dates: String!
    title: String

    # Linked Types
    items: [Item]
    team_members: [PlanPerson]
  }
`];

export const resolvers = {
  Plan: {
    ...makeAttributeResolvers([
      'created_at',
      'dates',
      'title',
    ]),
    ...makeLinkResolvers([
      'items',
      'team_members',
    ]),
  },
};
