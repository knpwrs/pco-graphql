import { pathOr } from 'ramda';
import { makeLinkResolvers, makeAttributeResolvers } from '../utils';
import { getResourceUrl } from '../../../api';

export const typeDefs = [`
  # A single plan within a Service Type.
  type Plan {
    id: ID!

    created_at: String!
    dates: String!
    title: String

    next_plan: Plan
    items: [Item]
    # People scheduled for this plan.
    team_members: [PlanPerson]

    next_plan_id: String
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
      'next_plan',
    ]),
    // Resolves to `null` if there is no next plan
    next_plan_id: pathOr(null, ['relationships', 'next_plan', 'data', 'id']),
  },
};
