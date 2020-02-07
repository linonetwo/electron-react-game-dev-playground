// @flow
export default function mouseMove({ entities, gameEvents }) {
  gameEvents.forEach(event => {
    if (event.type === 'mouse-move') {
      const mouseEntity = entities.find(entity => entity['@type'] === 'mouse');
      if (mouseEntity) {
        mouseEntity.x = event.x;
        mouseEntity.y = event.y;
      }
    }
  });
}
