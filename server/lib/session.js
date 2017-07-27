import session from 'express-session';
import connectRedis from 'connect-redis';
import { encrypt, decrypt } from './crypto';

const { SECRET, NODE_ENV: ENV } = process.env;

const RedisStore = connectRedis(session);

// The stringify and parse functions are used as a poor man's way to encrypt
// sensitive data in the session. In our case, the session is nothing but
// sensitive data (access tokens), so we just encrypt the whole thing.
const stringify = obj => encrypt(JSON.stringify(obj), SECRET);
const parse = str => JSON.parse(decrypt(str, SECRET));

export default session({
  store: new RedisStore({
    host: 'redis',
    serializer: {
      stringify,
      parse,
    },
  }),
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: ENV === 'production',
  },
});
