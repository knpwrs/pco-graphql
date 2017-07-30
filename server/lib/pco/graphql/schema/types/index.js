import { resolvers as personResolvers, typeDefs as personTypeDefs } from './person';
import { resolvers as addressResolvers, typeDefs as addressTypeDefs } from './address';
import { resolvers as appResolvers, typeDefs as appTypeDefs } from './app';
import { resolvers as emailResolvers, typeDefs as emailTypeDefs } from './email';
import { resolvers as phoneNumberResolvers, typeDefs as phoneNumberTypeDefs } from './phone-number';

export const typeResolvers = {
  ...personResolvers,
  ...addressResolvers,
  ...appResolvers,
  ...emailResolvers,
  ...phoneNumberResolvers,
};

export const typeDefs = [
  ...personTypeDefs,
  ...addressTypeDefs,
  ...appTypeDefs,
  ...emailTypeDefs,
  ...phoneNumberTypeDefs,
];
