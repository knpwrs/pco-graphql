import { makeExecutableSchema } from 'graphql-tools';
import {
  resolvers as personResolvers,
  schema as personSchema,
} from './person';
import { profileUrl } from '../../';

const rootSchema = [`
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
      return loader.load(profileUrl);
    },
  },
};

const schema = [
  ...rootSchema,
  ...personSchema,
];

const resolvers = {
  ...rootResolvers,
  ...personResolvers,
};

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
