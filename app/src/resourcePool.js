// @flow
/* eslint-disable no-await-in-loop, guard-for-in */
import * as PIXI from 'pixi.js';

class ResourcePool {
  index = {};
  textures = {};
  addTextureRaw(name: string, rawTexture: string) {
    this.textures[name] = rawTexture;
  }
  /**
   *
   * @param {*} name Name of resource
   * @param {*} modifyTexture Function to do something with texture, return a new texture
   * @param {*} copyFrom Name of resource, You can copy a texture and create a flipped version
   */
  getTexture(
    name: string,
    modifyTexture: Function = i => i,
    copyFrom: ?string,
  ) {
    // generate a new texture from another texture
    if (copyFrom && !this.textures[name] && this.textures[copyFrom]) {
      if (this.textures[copyFrom] instanceof PIXI.Texture) {
        this.textures[name] = modifyTexture(this.textures[copyFrom]);
      } else {
        this.textures[name] = this.textures[copyFrom];
      }
    }
    // if no "copyFrom" set
    if (!this.textures[name]) return null;
    if (!(this.textures[name] instanceof PIXI.Texture)) {
      // generate texture on first load
      this.textures[name] = new PIXI.Texture.from(this.textures[name]);
      if (modifyTexture) {
        this.textures[name] = modifyTexture(this.textures[name]);
      }
    }
    return this.textures[name];
  }
}
export const resources = new ResourcePool();

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
        resources.addTextureRaw(resourceDetailName, resourceBuffer);
      }
    });
    allTextureIndex[modName].hair.forEach(async resourceName => {
      for (const facing of ['north', 'south', 'east']) {
        const resourceDetailName = `${resourceName}_${facing}`;
        const resourceBuffer = await window.mod.getTexture({
          modName,
          texturePath: `hair/${resourceDetailName}.png`,
        });
        resources.addTextureRaw(resourceDetailName, resourceBuffer);
      }
    });
    allTextureIndex[modName].bodies.forEach(async resourceName => {
      for (const facing of ['north', 'south', 'east']) {
        const resourceDetailName = `${resourceName}_${facing}`;
        const resourceBuffer = await window.mod.getTexture({
          modName,
          texturePath: `bodies/${resourceDetailName}.png`,
        });
        resources.addTextureRaw(resourceDetailName, resourceBuffer);
      }
    });
    Object.keys(allTextureIndex[modName].flowers).forEach(
      async resourceName => {
        for (const resourceDetailName of allTextureIndex[modName].flowers[
          resourceName
        ]) {
          const resourceBuffer = await window.mod.getTexture({
            modName,
            texturePath: `flowers/${resourceName}/${resourceDetailName}.png`,
          });
          resources.addTextureRaw(resourceDetailName, resourceBuffer);
        }
      },
    );
    Object.keys(allTextureIndex[modName].tree).forEach(async resourceName => {
      for (const resourceDetailName of allTextureIndex[modName].tree[
        resourceName
      ]) {
        const resourceBuffer = await window.mod.getTexture({
          modName,
          texturePath: `tree/${resourceName}/${resourceDetailName}.png`,
        });
        resources.addTextureRaw(resourceDetailName, resourceBuffer);
      }
    });
    allTextureIndex[modName].floors.forEach(async resourceName => {
      const resourceBuffer = await window.mod.getTexture({
        modName,
        texturePath: `floors/${resourceName}.png`,
      });
      resources.addTextureRaw(resourceName, resourceBuffer);
    });
  }
});
