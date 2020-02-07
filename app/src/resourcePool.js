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
    Object.keys(allTextureIndex[modName].flowers).forEach(async resourceName => {
      for (const resourceDetailName of allTextureIndex[modName].flowers[
        resourceName
      ]) {
        const resourceBuffer = await window.mod.getTexture({
          modName,
          texturePath: `flowers/${resourceName}/${resourceDetailName}.png`,
        });
        resources[resourceDetailName] = resourceBuffer;
      }
    });
    Object.keys(allTextureIndex[modName].tree).forEach(async resourceName => {
      for (const resourceDetailName of allTextureIndex[modName].tree[
        resourceName
      ]) {
        const resourceBuffer = await window.mod.getTexture({
          modName,
          texturePath: `tree/${resourceName}/${resourceDetailName}.png`,
        });
        resources[resourceDetailName] = resourceBuffer;
      }
    });
    allTextureIndex[modName].floors.forEach(async resourceName => {
      const resourceBuffer = await window.mod.getTexture({
        modName,
        texturePath: `floors/${resourceName}.png`,
      });
      resources[resourceName] = resourceBuffer;
    });
  }
});
