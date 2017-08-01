import { makeRelationshipResolvers, makeAttributeResolvers } from '../utils';

export const typeDefs = [`
  # A person scheduled within a specific plan.
  type PlanPerson {
    id: ID!

    created_at: String!
    decline_reason: String
    name: String
    notes: String
    team_position_name: String
    updated_at: String

    # The actual Person object this PlanPerson represents.
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
      { key: 'person', api: 'people', resource: 'people' },
    ]),
  },
};
