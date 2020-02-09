// @flow
import { get } from 'lodash'
import type { SystemInput } from 'systems/typing';

export default function collisionResolve({ entities }: SystemInput) {
  const entitiesToCollide = entities.filter(
    entity => get(entity, 'collider.collidingWith.length'),
  );
  for (const entity of entitiesToCollide) {
    if ('velocity' in entity) {
      entity.velocity = [0, 0];
    }
  }
}
