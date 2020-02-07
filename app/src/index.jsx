import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import * as PIXI from 'pixi.js';
import { install } from '@pixi/unsafe-eval';

import Routes from './routes';
import i18n from '../localization/i18n.config';
import { store, history } from './redux';
import GlobalStyle from './GlobalStyles';

// Apply the patch to PIXI, Adds support for environments that disallow support of new Function, such as WeChat.
install(PIXI);

function Root() {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    </>
  );
}

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Suspense fallback="loading">
      <Root />
    </Suspense>
  </I18nextProvider>,
  document.getElementById('target'),
);
