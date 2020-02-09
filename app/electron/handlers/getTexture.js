/* eslint-disable no-await-in-loop */
const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const { resourcesPath } = require('../constants');

const modFolder = path.join(resourcesPath, 'mods');
let modList = [];
fs.readdir(modFolder).then(dirList => {
  modList = dirList;
});

ipcMain.handle('get-texture-index', async () => {
  const allTextureIndexes = {};
  for (const modName of modList) {
    const textureIndexLocation = path.join(modFolder, modName, 'textures', 'textures.json');
    const indexFileString = await fs.readFile(textureIndexLocation, 'utf-8');
    allTextureIndexes[modName] = JSON.parse(indexFileString);
  }
  return allTextureIndexes;
});

ipcMain.handle('get-texture', async (event, { modName, texturePath }) => {
  const textureLocation = path.join(modFolder, modName, 'textures', texturePath);
  const result = await fs.readFile(textureLocation, 'base64');
  return `data:image/png;base64,${result}`;
});
