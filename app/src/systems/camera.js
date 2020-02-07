import { vAdd } from 'vec-la-fp';

export default function camera({ entities, keysDown }) {
  const camera = entities.find(e => e['@type'] === 'camera');
  const protagonistPawn = entities.find(e => e['@type'] === 'protagonistPawn');
  if (camera) {
    if (protagonistPawn) {
      // with protagonist, we center our view around the character
      camera.x = protagonistPawn.x;
      camera.y = protagonistPawn.y;
    } else {
      // without protagonist, we follow the arrow keys
      if (keysDown.includes('ArrowLeft')) {
        camera.x -= 8;
      }
      if (keysDown.includes('ArrowRight')) {
        camera.x += 8;
      }
      if (keysDown.includes('ArrowUp')) {
        camera.y -= 8;
      }
      if (keysDown.includes('ArrowDown')) {
        camera.y += 8;
      }
    }
  }
}
