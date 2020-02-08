// @flow
/* eslint-disable no-param-reassign */
const initialState = {
  save: false,
  load: false,
};
export default {
  state: initialState,
  reducers: {
    toggleDialog(state: typeof initialState, dialogName: string) {
      if (state[dialogName] !== undefined) {
        state[dialogName] = !state[dialogName];
      }
    },
  },
};
