// @flow
import rigidBody from '~/entities/components/rigidBody';

export default {
  '@type': 'mouse',
  ...rigidBody,
  Renderer: () => null,
};
