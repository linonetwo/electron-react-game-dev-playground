const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mod', {
  getTexture: ({ modName, texturePath }) => ipcRenderer.invoke('get-texture', { modName, texturePath }),
  getTextureIndex: () => ipcRenderer.invoke('get-texture-index'),
});
