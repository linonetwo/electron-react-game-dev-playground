// @flow
const { ipcMain } = require('electron');
const protobuf = require('protobufjs');
const path = require('path');
const fs = require('fs').promises;

const { saveMapMetadata, saveMapChunk } = require('./saveProtobuf');
const { readAvailableSaves } = require('./readAvailableSaves');
const { getSaveDirPath } = require('./getSaveDir');

ipcMain.on('save-map', async (event, mapData) => {
  const { name, openTime, previousPlayTime, entities } = mapData;

  const saveTime = new Date();
  const chunks = [
    {
      anchorX: 0,
      anchorY: 0,
      width: -1,
      height: -1,
      id: 0,
    },
  ];

  await Promise.all([
    saveMapMetadata({ name, openTime, previousPlayTime, saveTime }, chunks),
    saveMapChunk(name, entities),
  ]);
});

// load chunk metadata so we can know which chunk to load first
ipcMain.handle('load-all-map-metadata', async () => {
  // TODO: add screenshot to save metadata
  const protocolRoot = await protobuf.load(path.join(__dirname, 'MapMetadata.proto'));
  const MapMetadata = protocolRoot.lookupType('MapMetadata');

  const availableSaves = await readAvailableSaves();
  const buffers = await Promise.all(
    availableSaves.map(saveName => {
      return fs.readFile(path.join(getSaveDirPath(saveName), `${saveName}.protocolbuffer`));
    }),
  );

  const mapMetadataList = buffers
    .map(buffer => MapMetadata.decode(buffer))
    .map(mapMetadataMessage => MapMetadata.toObject(mapMetadataMessage));
  return mapMetadataList;
});

// load map detail chunk
ipcMain.handle('load-map-chunk', async (event, { saveName, chunkID }) => {
  const protocolRoot = await protobuf.load(path.join(__dirname, 'MapChunk.proto'));
  const MapChunk = protocolRoot.lookupType('MapChunk');
  const buffer = await fs.readFile(path.join(getSaveDirPath(saveName), `${saveName}.${chunkID}.protocolbuffer`));

  const message = MapChunk.decode(buffer);
  const mapChunkData = MapChunk.toObject(message);

  if (mapChunkData.id !== chunkID)
    throw new Error(`map chunk ID mismatch: mapChunkData.id=${mapChunkData.id} chunkID=${chunkID}`);
  const entities = mapChunkData.entities.map(({ type, position, rest }) => ({
    '@type': type,
    position,
    ...JSON.parse(rest),
  }));
  return entities;
});
