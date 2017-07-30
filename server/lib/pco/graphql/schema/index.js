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
import {
  resolvers as phoneNumberResolvers,
  schema as phoneNumberSchema,
} from './phone-number';
import { meUrl, personUrl } from '../../endpoints';

const rootSchema = [`
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
  ...rootSchema,
  ...personSchema,
  ...addressSchema,
  ...appSchema,
  ...emailSchema,
  ...phoneNumberSchema,
];

const resolvers = {
  ...rootResolvers,
  ...personResolvers,
  ...addressResolvers,
  ...appResolvers,
  ...emailResolvers,
  ...phoneNumberResolvers,
};

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
