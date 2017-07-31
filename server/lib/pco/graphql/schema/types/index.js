import { resolvers as personResolvers, typeDefs as personTypeDefs } from './person';
import { resolvers as addressResolvers, typeDefs as addressTypeDefs } from './address';
import { resolvers as appResolvers, typeDefs as appTypeDefs } from './app';
import { resolvers as emailResolvers, typeDefs as emailTypeDefs } from './email';
import { resolvers as phoneNumberResolvers, typeDefs as phoneNumberTypeDefs } from './phone-number';
import { resolvers as serviceTypeResolvers, typeDefs as serviceTypeTypeDefs } from './service-type';
import { resolvers as planResolvers, typeDefs as planTypeDefs } from './plan';
import { resolvers as itemResolvers, typeDefs as itemTypeDefs } from './item';
import { mergeAllDeep } from '../utils';

export const typeResolvers = mergeAllDeep([
  personResolvers,
  addressResolvers,
  appResolvers,
  emailResolvers,
  phoneNumberResolvers,
  serviceTypeResolvers,
  planResolvers,
  itemResolvers,
]);

export const typeDefs = [
  ...personTypeDefs,
  ...addressTypeDefs,
  ...appTypeDefs,
  ...emailTypeDefs,
  ...phoneNumberTypeDefs,
  ...serviceTypeTypeDefs,
  ...planTypeDefs,
  ...itemTypeDefs,
];
