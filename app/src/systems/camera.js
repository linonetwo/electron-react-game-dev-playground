// @flow
import { vScale, vSub, vAdd } from 'vec-la-fp';
import type { SystemInput } from 'systems/typing';

export default function camera({ entities, keysDown, gameEvents }: SystemInput) {
  const cameraEntity = entities.find(e => e['@type'] === 'camera');
  const protagonistPawn = entities.find(e => e['@type'] === 'protagonistPawn');
  if (cameraEntity) {
    // handle camera move
    if (protagonistPawn) {
      // with protagonist, we center our view around the character
      cameraEntity.position = vAdd(
        cameraEntity.position,
        vScale(0.5, vSub(protagonistPawn.position, cameraEntity.position)),
      );
    } else {
      let moveVelocity = [0, 0];
      const acceleration = 20;
      if (keysDown.includes('ArrowLeft')) {
        moveVelocity = vAdd(moveVelocity, [-acceleration, 0]);
      }
      if (keysDown.includes('ArrowRight')) {
        moveVelocity = vAdd(moveVelocity, [acceleration, 0]);
      }
      if (keysDown.includes('ArrowUp')) {
        moveVelocity = vAdd(moveVelocity, [0, -acceleration]);
      }
      if (keysDown.includes('ArrowDown')) {
        moveVelocity = vAdd(moveVelocity, [0, acceleration]);
      }
      cameraEntity.velocity = vAdd(cameraEntity.velocity, moveVelocity);
      cameraEntity.acceleration = vScale(-1, cameraEntity.velocity);
    }

    // handle window resize
    gameEvents.forEach(event => {
      if (event.type === 'resize-window' && event.payload) {
        const { width, height } = event.payload;
        cameraEntity.width = width;
        cameraEntity.height = height;
      }
    });
  }
}
