import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, typeResolvers } from './types';
import { mergeAllDeep } from './utils';
import { meUrl } from '../../endpoints';

const rootTypeDefs = [`
  type Query {
    me: Person
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
  },
};

const schema = [
  ...rootTypeDefs,
  ...typeDefs,
];

const resolvers = mergeAllDeep([
  rootResolvers,
  typeResolvers,
]);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
