// @flow
import type { SystemInput } from 'systems/typing';

export default function collisionResolve({ entities }: SystemInput) {
  const entitiesToCollide = entities.filter(
    entity => 'collidingWith' in entity && entity.collidingWith.width,
  );
  for (const entity of entitiesToCollide) {
    // TODO: only purge the velocity component in the direction with obstacle
    if ('acceleration' in entity) {
      entity.acceleration = [0, 0];
    }
    if ('velocity' in entity) {
      entity.velocity = [0, 0];
    }
  }
}
