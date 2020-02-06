const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

ipcMain.handle('get-texture', async (event, textureIRI) => {
  const modFolder = path.join(__dirname, '../../src/mods/core/textures');
  const textureLocation = path.join(modFolder, textureIRI);
  const result = await fs.readFile(textureLocation, 'base64');
  return `data:image/png;base64,${result}`;
});
