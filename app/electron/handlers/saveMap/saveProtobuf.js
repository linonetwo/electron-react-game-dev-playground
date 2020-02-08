const protobuf = require('protobufjs');
const path = require('path');
const fs = require('fs').promises;
const sub = require('date-fns/sub');
const add = require('date-fns/add');
const getTime = require('date-fns/getTime');

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
  // TODO: group file in folder with name, and support multiple auto save named in time
  fs.writeFile(path.join(__dirname, `${name}.protocolbuffer`), buffer);
}

async function saveMapChunk(mapName, entities) {
  // TODO: chunking
  const protocolRoot = await protobuf.load(
    path.join(__dirname, 'MapMetadata.proto'),
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
  fs.writeFile(
    path.join(__dirname, `${mapName}.${chunkID}.protocolbuffer`),
    buffer,
  );
}

exports.saveMapMetadata = saveMapMetadata;
exports.saveMapChunk = saveMapChunk;
