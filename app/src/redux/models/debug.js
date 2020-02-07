/* eslint-disable no-param-reassign */
export default {
  state: {
    inDebugMode: false,
  },
  reducers: {
    // handle state changes with pure functions
    toggleDebugMode(state) {
      state.inDebugMode = !state.inDebugMode;
    },
  },
};
