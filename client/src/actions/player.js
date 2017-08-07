import { tap } from 'ramda';


export const setSong = (payload) => ({
  type: 'SET_SONG',
  payload,
});
export const clearSong = () => ({
  type: 'CLEAR_SONG',
});
