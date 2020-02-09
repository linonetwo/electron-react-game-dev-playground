// @flow
import boxIntersect from 'box-intersect';
import { vAdd } from 'vec-la-fp';

import type { SystemInput } from 'systems/typing';

export default function collisionPredict(collisionFilter: string[][]) {
  function shouldCollide(entityA, entityB) {
    for (const [a, b] of collisionFilter) {
      if (
        (entityA['@type'] === a && entityB['@type'] === b) ||
        (entityA['@type'] === b && entityB['@type'] === a)
      ) {
        return true;
      }
    }
    return false;
  }

  return ({ entities }: SystemInput) => {
    const boxes = [];
    const entityIndies: Array<number> = [];

    for (let index = 0; index < entities.length; index += 1) {
      const entity = entities[index];
      if (entity.renderable && 'collider' in entity && 'position' in entity) {
        entity.collider.collidingWith = [];
        if ('velocity' in entity) {
          boxes.push([
            ...vAdd(entity.position, entity.velocity),
            ...vAdd(
              vAdd(entity.position, [
                entity.collider.width,
                entity.collider.height,
              ]),
              entity.velocity,
            ),
          ]);
        } else {
          boxes.push([
            entity.position[0],
            entity.position[1],
            entity.position[0] + entity.collider.width,
            entity.position[1] + entity.collider.height,
          ]);
        }
        entityIndies.push(index);
      }
    }

    boxIntersect(boxes, (a, b) => {
      const entityA = entities[entityIndies[a]];
      const entityB = entities[entityIndies[b]];

      if (shouldCollide(entityA, entityB)) {
        entityA.collider.collidingWith.push(entityB);
        entityB.collider.collidingWith.push(entityA);
      }
    });
  };
}
