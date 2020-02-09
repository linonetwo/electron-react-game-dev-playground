// @flow
import moveableRigidBody from '~/entities/components/moveableRigidBody';

export default {
  '@type': 'camera',
  name: 'defaultCamera',
  ...moveableRigidBody,
  Renderer: () => null,
};
