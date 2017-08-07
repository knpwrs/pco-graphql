import React from 'react';
import { render } from 'react-dom';
import { combineReducers } from 'redux';
import { AppContainer } from 'react-hot-loader';
import { ApolloClient, ApolloProvider, createBatchingNetworkInterface } from 'react-apollo';
import { any, propEq } from 'ramda';
import document from 'global/document';
import window from 'global/window';
import cookies from 'js-cookie';
import Root from './root';
import configureStore from './store/configure-store';
import * as reducers from './reducers';

const networkInterface = createBatchingNetworkInterface({
  uri: '/graphql',
  batchInterval: 10,
  batchMax: 10,
  opts: {
    credentials: 'same-origin',
    headers: {
      'X-CSRF-Token': cookies.get('csrf-token'),
    },
  },
});

const anyUnauthorized = any(propEq('status', 401));

networkInterface.useAfter([{
  applyBatchAfterware({ responses }, next) {
    if (anyUnauthorized(responses)) {
      // For some reason directly interacting with a history object after a 401
      // results in a DOMException. Let's do a traditional redirect.
      window.location = '/login';
    }
    next();
  },
}]);

const apolloClient = new ApolloClient({
  queryDeduplication: true,
  networkInterface,
});

const createRootReducer = (inputReducers, client) => combineReducers({
  ...inputReducers,
  apollo: client.reducer(),
});

const store = configureStore(createRootReducer, reducers, apolloClient);

const el = document.createElement('div');
document.body.appendChild(el);

const mount = Component => render((
  <AppContainer>
    <ApolloProvider store={store} client={apolloClient}>
      <Component />
    </ApolloProvider>
  </AppContainer>
), el);

mount(Root);

if (module.hot) {
  module.hot.accept('./root.jsx', async () => {
    mount((await import('./root.jsx')).default);
  });
  module.hot.accept('./reducers', async () => {
    store.replaceReducer(createRootReducer(await import('./reducers'), apolloClient));
  });
}
