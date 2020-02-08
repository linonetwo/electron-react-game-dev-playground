// @flow
import type { SystemInput } from 'systems/typing';

const entitySerializer = {
  tree: entity => {
    return entity.trees.map(tree => ({ '@type': 'tree', ...tree }));
  },
};
export default function saveMap({ entities, gameEvents }: SystemInput) {
  gameEvents.forEach(event => {
    if (event.type === 'save-map' && event.payload) {
      const { name } = event.payload;

      const entityTypesToSave = ['tree', 'wall', 'pawn', 'protagonistPawn'];
      const entitiesToSave = entities
        .filter(
          entity =>
            entityTypesToSave.includes(entity['@type']) &&
            Object.keys(entitySerializer).includes(entity['@type']),
        )
        .flatMap(entity => entitySerializer[entity['@type']](entity));

      const mapData = {
        name,
        openTime: Date.now(),
        previousPlayTime: new Date(0),
        entities: entitiesToSave,
      };
      window.save.saveMap(mapData);
    }
  });
}
