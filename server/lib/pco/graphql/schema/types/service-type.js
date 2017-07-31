import { makeLinkResolvers, makeAttributeResolvers } from '../utils';
import { serviceTypeUrl, serviceTypesUrl } from '../../../endpoints';

export const typeDefs = [`
  type ServiceType {
    id: ID!

    # Attribute Types
    created_at: String!
    frequency: String!
    name: String!
    permissions: String!
    sequence: Int!
    updated_at: String!

    # Linked Types
    plans(order: String, filter: String): [Plan]
  }

  extend type Query {
    serviceType(id: ID!): ServiceType
    serviceTypes: [ServiceType]
  }
`];

export const resolvers = {
  ServiceType: {
    ...makeAttributeResolvers([
      'created_at',
      'frequency',
      'name',
      'permissions',
      'sequence',
      'updated_at',
    ]),
    ...makeLinkResolvers([
      'plans',
    ]),
  },
  Query: {
    serviceType(root, { id }, { loader }) {
      return loader.load(serviceTypeUrl(id));
    },
    serviceTypes(root, args, { loader }) {
      return loader.load(serviceTypesUrl(args));
    },
  },
};
