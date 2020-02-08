// @flow
import type { SystemInput } from 'systems/typing';

export default function mouseMove({ entities, gameEvents }: SystemInput) {
  gameEvents.forEach(event => {
    if (event.type === 'mouse-move') {
      const mouseEntity = entities.find(entity => entity['@type'] === 'mouse');
      if (mouseEntity && event.payload) {
        mouseEntity.x = event.payload.x;
        mouseEntity.y = event.payload.y;
      }
    }
  });
}
