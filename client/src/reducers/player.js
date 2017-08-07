const initialState = {
  thumb: null,
  url: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case 'SET_SONG':
    return payload;
  case 'CLEAR_SONG':
    return initialState;
  default:
    return state;
  }
};
