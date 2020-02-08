/* eslint-disable no-param-reassign */
export default {
  state: {
    inDebugMode: false,
  },
  reducers: {
    toggleDebugMode(state) {
      state.inDebugMode = !state.inDebugMode;
    },
  },
};
