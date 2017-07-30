import { makeLinkResolvers, makeAttributeResolvers } from '../utils';

export const typeDefs = [`
  type Person {
    id: ID!

    # Attribute Types
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

    # Linked Types
    addresses: [Address]
    apps: [App]
    connected_people: [Person]
    emails: [Email]
    phone_numbers: [PhoneNumber]
  }
`];

export const resolvers = {
  Person: {
    ...makeAttributeResolvers([
      'anniversary',
      'avatar',
      'birthdate',
      'child',
      'created_at',
      'demographic_avatar_url',
      'first_name',
      'gender',
      'given_name',
      'goes_by_name',
      'grade',
      'graduation_year',
      'last_name',
      'medical_notes',
      'membership',
      'remote_id',
      'site_administrator',
      'status',
      'updated_at',
    ]),
    ...makeLinkResolvers([
      'addresses',
      'apps',
      'connected_people',
      'emails',
      'phone_numbers',
    ]),
  },
};
