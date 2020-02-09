// @flow
import type { SystemInput } from 'systems/typing';

export default function listEntityUnderMouse({ entities }: SystemInput) {
  const mouseEntity = entities.find(entity => entity['@type'] === 'mouse');
  const underMouseEntity = entities.find(
    entity => entity['@type'] === 'underMouse',
  );
  if (mouseEntity && underMouseEntity) {
    const entityWithCollider = entities.filter(
      entity => 'collider' in entity && 'position' in entity,
    );
    const entityUnderMouse = entityWithCollider.filter(
      entity =>
        mouseEntity.position[0] >
          entity.position[0] - entity.collider.width / 2 &&
        mouseEntity.position[0] <
          entity.position[0] + entity.collider.width / 2 &&
        mouseEntity.position[1] >
          entity.position[1] - entity.collider.height / 2 &&
        mouseEntity.position[1] <
          entity.position[1] + entity.collider.height / 2,
    );
    underMouseEntity.entities = entityUnderMouse.map(entity => ({
      '@type': entity['@type'],
      name: entity.name,
    }));
  }
}
