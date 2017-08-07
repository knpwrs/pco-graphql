import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export default (createRootReducer, reducers, apolloClient, initialState = {}) => createStore(
  createRootReducer(reducers, apolloClient),
  initialState,
  composeWithDevTools(
    applyMiddleware(apolloClient.middleware()),
  ),
);
