/* eslint-disable no-await-in-loop, guard-for-in */

export const resources = {};

window.mod.getTextureIndex().then(allTextureIndex => {
  // { core: { heads: { female: [] } }, otherMod: {} }
  resources.index = allTextureIndex;

  for (const modName in allTextureIndex) {
    allTextureIndex[modName].heads.female.forEach(async resourceName => {
      for (const facing of ['north', 'south', 'east']) {
        const resourceDetailName = `${resourceName}_${facing}`;
        const resourceBuffer = await window.mod.getTexture({
          modName,
          texturePath: `heads/female/${resourceDetailName}.png`,
        });
        resources[resourceDetailName] = resourceBuffer;
      }
    });
    allTextureIndex[modName].hair.forEach(async resourceName => {
      for (const facing of ['north', 'south', 'east']) {
        const resourceDetailName = `${resourceName}_${facing}`;
        const resourceBuffer = await window.mod.getTexture({
          modName,
          texturePath: `hair/${resourceDetailName}.png`,
        });
        resources[resourceDetailName] = resourceBuffer;
      }
    });
    allTextureIndex[modName].bodies.forEach(async resourceName => {
      for (const facing of ['north', 'south', 'east']) {
        const resourceDetailName = `${resourceName}_${facing}`;
        const resourceBuffer = await window.mod.getTexture({
          modName,
          texturePath: `bodies/${resourceDetailName}.png`,
        });
        resources[resourceDetailName] = resourceBuffer;
      }
    });
  }
});
