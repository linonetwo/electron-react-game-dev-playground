const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const PNG = require('png-js');

function parsePng(filePath) {
  return new Promise(resolve => {
    PNG.decode(filePath, pixels => {
      // pixels is a 1d array (in rgba order) of decoded pixel data
      resolve(pixels);
    });
  });
}

ipcMain.handle('get-texture', async (event, textureIRI) => {
  const modFolder = path.join(__dirname, '../../src/mods/core/textures');
  const textureLocation = path.join(modFolder, textureIRI);
  const result = await parsePng(textureLocation);
  return result;
});
