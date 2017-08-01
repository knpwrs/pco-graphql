import { makeLinkResolvers, makeAttributeResolvers } from '../utils';

export const typeDefs = [`
  # A single plan within a Service Type.
  type Plan {
    id: ID!

    created_at: String!
    dates: String!
    title: String

    items: [Item]
    # People scheduled for this plan.
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
