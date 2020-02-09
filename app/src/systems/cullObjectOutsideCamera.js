// @flow
import type { SystemInput } from 'systems/typing';

export default function cullObjectOutsideCamera({ entities }: SystemInput) {
  const cameraEntity = entities.find(e => e['@type'] === 'camera');
  if (!cameraEntity) return;
  const halfCameraWidth = cameraEntity.width / 2;
  const halfCameraHeight = cameraEntity.height / 2;
  const cameraRightBorderX = cameraEntity.position[0] + halfCameraWidth;
  const cameraLeftBorderX = cameraEntity.position[0] - halfCameraWidth;
  const cameraUpBorderY = cameraEntity.position[1] + halfCameraHeight;
  const cameraDownBorderY = cameraEntity.position[1] - halfCameraHeight;
  for (const entity of entities) {
    // TODO: don't check entity that are far from camera, use octo-tree
    if ('position' in entity) {
      const outsideCamera =
        entity.position[0] > cameraRightBorderX ||
        entity.position[0] < cameraLeftBorderX ||
        entity.position[1] > cameraUpBorderY ||
        entity.position[1] < cameraDownBorderY;
      entity.renderable = !outsideCamera;
    }
  }
}
