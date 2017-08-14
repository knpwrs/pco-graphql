import { makeRelationshipResolvers, makeAttributeResolvers } from '../utils';

export const typeDefs = [`
  # A person scheduled within a specific plan.
  type PlanPerson {
    id: ID!

    # The time this scheduled person was created.
    created_at: String!
    # The reason this person declined to be scheduled, if given.
    decline_reason: String
    # The name of the scheduled person.
    name: String
    # Notes for this scheduled person.
    notes: String
    # The position this person holds within the team.
    team_position_name: String
    # The date and time this person was last updated.
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
