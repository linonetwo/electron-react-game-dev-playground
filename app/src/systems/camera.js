// @flow
import type { SystemInput } from 'systems/typing';

export default function camera({ entities, keysDown }: SystemInput) {
  const cameraEntity = entities.find(e => e['@type'] === 'camera');
  const protagonistPawn = entities.find(e => e['@type'] === 'protagonistPawn');
  if (cameraEntity) {
    if (protagonistPawn) {
      // with protagonist, we center our view around the character
      cameraEntity.x += Math.floor((protagonistPawn.x - cameraEntity.x) / 2);
      cameraEntity.y += Math.floor((protagonistPawn.y - cameraEntity.y) / 2);
    } else {
      // without protagonist, we follow the arrow keys
      if (keysDown.includes('ArrowLeft')) {
        cameraEntity.x -= 8;
      }
      if (keysDown.includes('ArrowRight')) {
        cameraEntity.x += 8;
      }
      if (keysDown.includes('ArrowUp')) {
        cameraEntity.y -= 8;
      }
      if (keysDown.includes('ArrowDown')) {
        cameraEntity.y += 8;
      }
    }
  }
}
