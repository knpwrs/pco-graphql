import { makeExecutableSchema } from 'graphql-tools';
import {
  resolvers as personResolvers,
  schema as personSchema,
} from './person';
import {
  resolvers as addressResolvers,
  schema as addressSchema,
} from './address';
import {
  resolvers as appResolvers,
  schema as appSchema,
} from './app';
import {
  resolvers as emailResolvers,
  schema as emailSchema,
} from './email';
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
  ...appSchema,
  ...emailSchema,
];

const resolvers = {
  ...rootResolvers,
  ...personResolvers,
  ...addressResolvers,
  ...appResolvers,
  ...emailResolvers,
};

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
