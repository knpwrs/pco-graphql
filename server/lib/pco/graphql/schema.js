import { makeExecutableSchema } from 'graphql-tools';
import { prop } from 'ramda';
import { profileUrl } from '../';

const rootSchema = [`
  type Query {
    me: Person
  }

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

  schema {
    query: Query
  }
`];

const rootResolvers = {
  Query: {
    me(root, args, { loader }) {
      return loader.load(profileUrl);
    },
  },
  PersonAttributes: prop('attributes'),
};

const schema = [...rootSchema];

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: rootResolvers,
});

export default executableSchema;
