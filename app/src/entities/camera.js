// @flow
import moveableRigidBody from '~/entities/components/moveableRigidBody';

export default {
  '@type': 'camera',
  name: 'defaultCamera',
  width: 800,
  height: 600,
  scale: 1,
  ...moveableRigidBody,
  Renderer: () => null,
};
