// @flow
import type { SystemInput } from 'systems/typing';

export default function mouseMove({ entities, gameEvents }: SystemInput) {
  gameEvents.forEach(event => {
    if (event.type === 'mouse-move') {
      const mouseEntity = entities.find(entity => entity['@type'] === 'mouse');
      if (mouseEntity && event.payload) {
        const { x, y } = event.payload;
        mouseEntity.position[0] = x;
        mouseEntity.position[1] = y;
      }
    }
  });
}
