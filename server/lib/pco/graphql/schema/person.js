import { prop } from 'ramda';

export const schema = [`
  type Person {
    id: ID!
    attributes: PersonAttributes
  }

  type PersonAttributes {
    anniversary: String
    avatar: String!
    birthdate: String!
    child: Boolean!
    created_at: String!
    demographic_avatar_url: String!
    first_name: String
    gender: String # Could also be a GraphQL Enum.
    given_name: String
    goes_by_name: String
    grade: Int
    graduation_year: Int
    last_name: String
    medical_notes: String
    membership: String
    remote_id: Int
    site_administrator: Boolean!
    status: String!
    updated_at: String!
  }
`];

export const resolvers = {
  PersonAttributes: prop('attributes'),
};
