import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, typeResolvers } from './types';
import { meUrl, personUrl, peopleUrl } from '../../endpoints';

const rootTypeDefs = [`
  type Query {
    me: Person
    person(id: ID!): Person
    people(where: PersonWhereParams): [Person]
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
    people(root, args, { loader }) {
      return loader.load(peopleUrl(args));
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
