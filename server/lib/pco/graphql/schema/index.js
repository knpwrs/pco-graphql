import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, typeResolvers } from './types';
import { meUrl, personUrl } from '../../endpoints';

const rootTypeDefs = [`
  type Query {
    me: Person
    person(id: ID!): Person
  }

  schema {
    query: Query
  }
`];

const rootResolvers = {
  Query: {
    me(root, args, { loader }) {
      return loader.load(meUrl());
    },
    person(root, { id }, { loader }) {
      return loader.load(personUrl(id));
    },
  },
};

const schema = [
  ...rootTypeDefs,
  ...typeDefs,
];

const resolvers = {
  ...rootResolvers,
  ...typeResolvers,
};

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
