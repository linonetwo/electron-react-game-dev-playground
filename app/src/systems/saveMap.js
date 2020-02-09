// @flow
import type { SystemInput } from 'systems/typing';

export default function saveMap({ entities, gameEvents }: SystemInput) {
  gameEvents.forEach(event => {
    if (event.type === 'save-map' && event.payload) {
      const { name } = event.payload;

      const entityTypesToSave = ['tree', 'wall-standalone', 'floor', 'pawn', 'protagonistPawn'];
      const entitiesToSave = entities.filter(entity =>
        entityTypesToSave.includes(entity['@type']),
      );

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
