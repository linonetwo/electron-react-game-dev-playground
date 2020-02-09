// @flow
import rigidBody from '~/entities/components/rigidBody';
import type { IRigidBody } from '~/entities/components/rigidBody';

export type IMoveableRigidBody = {
  velocity: number[],
  acceleration: number[],
} & IRigidBody;

export default {
  ...rigidBody,
  velocity: [0, 0],
  acceleration: [0, 0],
};
