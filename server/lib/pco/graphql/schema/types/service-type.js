import { makeLinkResolvers, makeAttributeResolvers } from '../utils';
import { getResourceUrl, getTypeUrl } from '../../../api';

export const typeDefs = [`
  # A Service Type is a container for plans.
  type ServiceType {
    id: ID!

    created_at: String!
    frequency: String!
    name: String!
    permissions: String!
    sequence: Int!
    updated_at: String!

    plans(order: String, filter: String): [Plan]
  }

  extend type Query {
    # Find an invidiual service type by ID.
    serviceType(id: ID!): ServiceType
    # Find service types with a name that includes a given string.
    serviceTypes(nameLike: String): [ServiceType]
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
      return loader.load(getResourceUrl('services', 'service_types', id));
    },
    serviceTypes: async (root, { nameLike }, { loader }) => {
      const serviceTypes = await loader.load(getTypeUrl('services', 'service_types'));
      if (nameLike) {
        return serviceTypes.filter(type => type.attributes.name.includes(nameLike));
      }
      return serviceTypes;
    },
  },
};
