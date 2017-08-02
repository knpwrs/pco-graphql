import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, typeResolvers } from './types';
import { mergeAllDeep } from './utils';
import { getTypeUrl } from '../../api';

const rootTypeDefs = [`
  type Query {
    me: Person
  }
`];

const rootResolvers = {
  Query: {
    me(root, args, { loader }) {
      return loader.load(getTypeUrl('people', 'me'));
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
