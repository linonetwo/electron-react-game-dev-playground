// @flow
/** Denote entity is being chopped, every n seconds for a round to taking damage */
export type IChopped = {
  '@type': 'chopped',
  /** how long does it be chopped */
  choppedTime: number,
};

export default {
  '@type': 'chopped',
  choppedTime: 0,
};
