import createStore from './createStore';
import debug from './models/debug';

export { history } from './createStore';

export const store = createStore({ debug });
