import { makeLinkResolvers, makeAttributeResolvers } from '../utils';
import { getResourceUrl } from '../../../api';

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

  extend type Query {
    plan(typeId: ID!, planId: ID!): Plan
  }
`];

export const resolvers = {
  Query: {
    plan(root, { typeId, planId }, { loader }) {
      const serviceTypeUrl = getResourceUrl('services', 'service_types', typeId);
      return loader.load(`${serviceTypeUrl}/plans/${planId}`);
    },
  },
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
