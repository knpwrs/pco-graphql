import { resolvers as personResolvers, typeDefs as personTypeDefs } from './person';
import { resolvers as addressResolvers, typeDefs as addressTypeDefs } from './address';
import { resolvers as appResolvers, typeDefs as appTypeDefs } from './app';
import { resolvers as emailResolvers, typeDefs as emailTypeDefs } from './email';
import { resolvers as phoneNumberResolvers, typeDefs as phoneNumberTypeDefs } from './phone-number';
import { resolvers as serviceTypeResolvers, typeDefs as serviceTypeTypeDefs } from './service-type';
import { resolvers as planResolvers, typeDefs as planTypeDefs } from './plan';
import { resolvers as itemResolvers, typeDefs as itemTypeDefs } from './item';
import { resolvers as songResolvers, typeDefs as songTypeDefs } from './song';
import { resolvers as planPersonResolvers, typeDefs as planPersonTypeDefs } from './plan-person';
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
  songResolvers,
  planPersonResolvers,
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
  ...songTypeDefs,
  ...planPersonTypeDefs,
];
