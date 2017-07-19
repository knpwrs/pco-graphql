import debug from 'debug';

const d = debug('app:server');

const { CALLBACK_URL, PORT, OAUTH_CLIENT_ID, OAUTH_SECRET } = process.env;

d(`PORT: ${PORT}`);
d(`OAUTH_CLIENT_ID: ${OAUTH_CLIENT_ID}`);
d(`OAUTH_SECRET: ${OAUTH_SECRET}`);
