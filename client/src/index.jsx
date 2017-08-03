import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import document from 'global/document';
import cookies from 'js-cookie';
import Root from './root';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
    headers: {
      'X-CSRF-Token': cookies.get('csrf-token'),
    },
  },
});

const client = new ApolloClient({
  networkInterface,
});

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  {}, // initial state,
  composeWithDevTools(
    applyMiddleware(client.middleware()),
  ),
);

const el = document.createElement('div');
document.body.appendChild(el);

const mount = Component => render((
  <AppContainer>
    <ApolloProvider store={store} client={client}>
      <Component />
    </ApolloProvider>
  </AppContainer>
), el);

mount(Root);

if (module.hot) {
  module.hot.accept('./root.jsx', async () => {
    mount((await import('./root.jsx')).default);
  });
}
