const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const i18nextBackend = require('i18next-electron-fs-backend');
const Store = require('secure-electron-store').default;

// Create the electron store to be made available in the renderer process
const store = new Store();

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  i18nextElectronBackend: i18nextBackend.preloadBindings(ipcRenderer),
  store: store.preloadBindings(ipcRenderer, fs),
});

contextBridge.exposeInMainWorld('mod', {
  getTexture: ({ modName, texturePath }) =>
    ipcRenderer.invoke('get-texture', { modName, texturePath }),
  getTextureIndex: () => ipcRenderer.invoke('get-texture-index'),
});
