import { makeRelationshipResolvers, makeAttributeResolvers } from '../utils';

export const typeDefs = [`
  type PlanPerson {
    id: ID!

    # Attribute Types
    created_at: String!
    decline_reason: String
    name: String
    notes: String
    team_position_name: String
    updated_at: String

    # Relationship Types
    person: Person
  }
`];

export const resolvers = {
  PlanPerson: {
    ...makeAttributeResolvers([
      'created_at',
      'decline_reason',
      'name',
      'notes',
      'team_position_name',
      'updated_at',
    ]),
    ...makeRelationshipResolvers([
      ['person', 'people', 'people'],
    ]),
  },
};
