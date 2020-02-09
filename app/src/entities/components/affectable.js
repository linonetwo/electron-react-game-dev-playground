// @flow
export type IAffectable = {
  buff: Object[],
  debuff: Object[],
  /** things entity is doing, for example eating */
  pose: Object[],
};

export default {
  buff: [],
  debuff: [],
  pose: [],
};
