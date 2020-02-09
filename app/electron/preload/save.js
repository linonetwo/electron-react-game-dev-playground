const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('save', {
  saveMap: mapData => ipcRenderer.send('save-map', mapData),
  loadMapMetadataList: () => ipcRenderer.invoke('load-all-map-metadata'),
  loadMapChunk: ({ saveName, chunkID }) => ipcRenderer.invoke('load-map-chunk', { saveName, chunkID }),
});
