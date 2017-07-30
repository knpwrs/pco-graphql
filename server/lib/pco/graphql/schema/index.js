import { makeExecutableSchema } from 'graphql-tools';
import {
  resolvers as personResolvers,
  schema as personSchema,
} from './person';
import {
  resolvers as addressResolvers,
  schema as addressSchema,
} from './address';
import { meUrl } from '../../endpoints';

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
      return loader.load(meUrl());
    },
  },
};

const schema = [
  ...rootSchema,
  ...personSchema,
  ...addressSchema,
];

const resolvers = {
  ...rootResolvers,
  ...personResolvers,
  ...addressResolvers,
};

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
