import { makeLinkResolvers, makeAttributeResolvers } from '../utils';
import { getResourceUrl, getTypeUrl } from '../../../api';

export const typeDefs = [`
  # A Service Type is a container for plans.
  type ServiceType {
    id: ID!

    # The date and time this service type was created.
    created_at: String!
    # The frequency at which this plan occurs.
    frequency: String!
    # The name of this service type.
    name: String!
    # Permissions associated with this service type.
    permissions: String!
    # The sequence number of this service type.
    sequence: Int!
    # The date and time this service type was updated.
    updated_at: String!

    # Plans associated with this service type.
    plans(order: PlanOrderBy, filter: PlanFilter, desc: Boolean, per_page: Int, offset: Int): [Plan]
  }

  extend type Query {
    # Find an invidiual service type by ID.
    serviceType(id: ID!): ServiceType
    # Find service types with a name that includes a given string.
    serviceTypes(nameLike: String): [ServiceType]
  }

  # Methods of filtering service types.
  enum PlanFilter {
    future, past, no_dates
  }

  # Properties to sort service types by.
  enum PlanOrderBy {
    title, created_at, updated_at, sort_date
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
