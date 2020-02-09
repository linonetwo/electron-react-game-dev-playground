/* eslint-disable no-param-reassign */
// @flow
import { vAdd, vScale } from 'vec-la-fp';

import type { SystemInput } from 'systems/typing';

export default function pawnMovement({ entities, keysDown }: SystemInput) {
  entities
    .filter(
      entity =>
        entity['@type'] === 'protagonistPawn' &&
        'velocity' in entity &&
        'acceleration' in entity &&
        'baseMoveSpeed' in entity,
    )
    .forEach(entity => {
      let moveVelocity = [0, 0];
      const friction = 100;
      const acceleration = entity.baseMoveSpeed;
      if (keysDown.includes('ArrowLeft')) {
        moveVelocity = vAdd(moveVelocity, [-acceleration, 0]);
      }
      if (keysDown.includes('ArrowRight')) {
        moveVelocity = vAdd(moveVelocity, [acceleration, 0]);
      }
      if (keysDown.includes('ArrowUp')) {
        moveVelocity = vAdd(moveVelocity, [0, -acceleration]);
      }
      if (keysDown.includes('ArrowDown')) {
        moveVelocity = vAdd(moveVelocity, [0, acceleration]);
      }
      entity.velocity = vAdd(entity.velocity, moveVelocity);
      entity.acceleration = vScale(-1 * friction, entity.velocity);
    });
}
