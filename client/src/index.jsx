import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import document from 'global/document';
import Root from './root';

const el = document.createElement('div');
document.body.appendChild(el);

const mount = Component => render((
  <AppContainer>
    <Component />
  </AppContainer>
), el);

mount(Root);

if (module.hot) {
  module.hot.accept('./root.jsx', async () => {
    mount((await import('./root.jsx')).default);
  });
}
