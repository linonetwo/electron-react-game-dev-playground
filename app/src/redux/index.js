import createStore from './createStore';
import debug from './models/debug';
import dialog from './models/dialog';

export { history } from './createStore';

export const store = createStore({ debug, dialog });
