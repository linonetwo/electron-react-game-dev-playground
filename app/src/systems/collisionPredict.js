// @flow
import boxIntersect from 'box-intersect';
import { vAdd, vSub, vScale } from 'vec-la-fp';

import type { SystemInput } from 'systems/typing';

export default function collisionPredict(collisionFilter: string[][]) {
  function shouldCollide(entityA, entityB) {
    for (const [a, b] of collisionFilter) {
      if ((entityA['@type'] === a && entityB['@type'] === b) || (entityA['@type'] === b && entityB['@type'] === a)) {
        return true;
      }
    }
    return false;
  }

  return ({ entities, timeDiff }: SystemInput) => {
    const boxes = [];
    const entityIndies: Array<number> = [];

    for (let index = 0; index < entities.length; index += 1) {
      const entity = entities[index];
      if ('collider' in entity && 'position' in entity) {
        entity.collider.collidingWith = [];

        const colliderDiagonalHalf = vScale(0.5, [entity.collider.width, entity.collider.height]);
        if ('velocity' in entity) {
          const predictMovePosition = vAdd(entity.position, vScale(timeDiff, entity.velocity));
          boxes.push([
            ...vSub(predictMovePosition, colliderDiagonalHalf),
            ...vAdd(predictMovePosition, colliderDiagonalHalf),
          ]);
        } else {
          boxes.push([...vSub(entity.position, colliderDiagonalHalf), ...vAdd(entity.position, colliderDiagonalHalf)]);
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
