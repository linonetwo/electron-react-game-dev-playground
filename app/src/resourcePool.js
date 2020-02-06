/* eslint-disable no-await-in-loop */
import coreTexture from './mods/core/textures';

export const resources = {};

coreTexture.assets.heads.female.forEach(async resourceName => {
  for (const facing of ['north', 'south', 'east']) {
    const resourceDetailName = `${resourceName}_${facing}`;
    const resourceBuffer = await window.mod.getTexture(
      `Heads/Female/${resourceDetailName}.png`,
    );
    resources[resourceDetailName] = resourceBuffer;
  }
});
