import fetch from 'node-fetch';

export default async (url, token) => fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
