import { init } from '@rematch/core';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createLoadingPlugin from '@rematch/loading';
import immerPlugin from '@rematch/immer';
import createHashHistory from 'history/createHashHistory';

const loadingOptions = {};
const loading = createLoadingPlugin(loadingOptions);
const immer = immerPlugin();

export const history = createHashHistory();

const reducers = { router: connectRouter(history) };

export default models =>
  init({
    redux: {
      reducers,
      middlewares: [routerMiddleware(history)],
      devtoolOptions: {},
    },
    models,
    plugins: [loading, immer],
  });
