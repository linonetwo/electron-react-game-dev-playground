// @flow
import { original } from 'immer';

export default function listEntityUnderMouse({ entities }) {
  const mouseEntity = entities.find(entity => entity['@type'] === 'mouse');
  const underMouseEntity = entities.find(
    entity => entity['@type'] === 'underMouse',
  );
  if (mouseEntity) {
    const entityWithCollider = entities.filter(
      entity => 'collider' in entity && 'x' in entity && 'y' in entity,
    );
    const entityUnderMouse = entityWithCollider.filter(
      entity =>
        mouseEntity.x > entity.x - entity.collider.width / 2 &&
        mouseEntity.x < entity.x + entity.collider.width / 2 &&
        mouseEntity.y > entity.y - entity.collider.height / 2 &&
        mouseEntity.y < entity.y + entity.collider.height / 2,
    );
    underMouseEntity.entities = entityUnderMouse.map(entity => ({
      '@type': entity['@type'],
      name: entity.name,
    }));
  }
}
