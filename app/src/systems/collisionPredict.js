// @flow
import boxIntersect from 'box-intersect';
import type { SystemInput } from 'systems/typing';

export default function collisionPredict(collisionFilter: string[][]) {
  function shouldCollide(entityA, entityB) {
    for (const [a, b] of collisionFilter) {
      if (
        (entityA.collider.type === a && entityB.collider.type === b) ||
        (entityA.collider.type === b && entityB.collider.type === a)
      ) {
        return true;
      }
    }
    return false;
  }

  return ({ entities }: SystemInput) => {
    const boxes = [];

    for (const entity of entities) {
      if (
        'collider' in entity &&
        'position' in entity &&
        'position' in entity
      ) {
        entity.collider.collidingWith = [];
        boxes.push([
          entity.position[0],
          entity.position[1],
          entity.position[0] + entity.collider.width,
          entity.position[1] + entity.collider.height,
        ]);
      }
    }

    boxIntersect(boxes, (a, b) => {
      const entityA = entities[a];
      const entityB = entities[b];
      if (shouldCollide(entityA, entityB)) {
        entityA.collider.collidingWith.push(entityB);
        entityB.collider.collidingWith.push(entityA);
      }
    });
  };
}
