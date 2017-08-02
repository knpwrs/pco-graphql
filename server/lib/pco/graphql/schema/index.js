import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, typeResolvers } from './types';
import { mergeAllDeep } from './utils';
import { getTypeUrl } from '../../api';

const rootTypeDefs = [`
  type Query {
    me: Person
  }

  type Mutation {
    noop(input: Boolean): Boolean
  }
`];

const rootResolvers = {
  Query: {
    me(root, args, { loader }) {
      return loader.load(getTypeUrl('people', 'me'));
    },
  },
  Mutation: {
    noop() {
      return false;
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
