const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('save', {
  saveMap: mapData => ipcRenderer.send('save-map', mapData),
  loadMapMetadata: mapName => ipcRenderer.invoke('load-map-metadata', mapName),
  loadMapChunk: ({ mapName, chunkID }) =>
    ipcRenderer.invoke('load-map-chunk', { mapName, chunkID }),
});
