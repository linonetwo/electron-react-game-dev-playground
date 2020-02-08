const protobuf = require('protobufjs');
const path = require('path');
const fs = require('fs').promises;
const sub = require('date-fns/sub');
const add = require('date-fns/add');
const getTime = require('date-fns/getTime');

const { ensureSaveDir } = require('./getSaveDir');

async function saveMapMetadata(
  { name, openTime, previousPlayTime, saveTime },
  chunksMetadata,
) {
  const mapMetadata = {
    name,
    saveTime: saveTime.toISOString(),
    playTime: getTime(add(previousPlayTime, sub(saveTime, openTime))),
    chunks: chunksMetadata,
  };

  const protocolRoot = await protobuf.load(
    path.join(__dirname, 'MapMetadata.proto'),
  );
  const MapMetadata = protocolRoot.lookupType('MapMetadata');
  const errMsg = MapMetadata.verify(mapMetadata);
  if (errMsg) throw new Error(errMsg);

  // create buffer to store to fs
  const mapMetadataMessage = MapMetadata.create(mapMetadata);
  const buffer = MapMetadata.encode(mapMetadataMessage).finish();

  // create save folder and save the file
  const saveDirPath = await ensureSaveDir(name);
  fs.writeFile(path.join(saveDirPath, `${name}.protocolbuffer`), buffer);
}

async function saveMapChunk(mapName, entities) {
  // TODO: chunking
  const protocolRoot = await protobuf.load(
    path.join(__dirname, 'MapChunk.proto'),
  );
  const MapChunk = protocolRoot.lookupType('MapChunk');

  const chunkID = 0;
  const mapChunk = {
    id: chunkID,
    entities: entities.map(({ '@type': type, x, y, ...rest }) => ({
      type,
      x,
      y,
      rest: JSON.stringify(rest),
    })),
  };

  const errMsg = MapChunk.verify(mapChunk);
  if (errMsg) throw Error(errMsg);

  const mapChunkMessage = MapChunk.create(mapChunk);
  const buffer = MapChunk.encode(mapChunkMessage).finish();

  // create save folder and save the file
  const saveDirName = await ensureSaveDir(mapName);
  fs.writeFile(
    path.join(saveDirName, `${mapName}.${chunkID}.protocolbuffer`),
    buffer,
  );
}

exports.saveMapMetadata = saveMapMetadata;
exports.saveMapChunk = saveMapChunk;
