// @flow

/** as app/electron/handlers/saveMap/MapMetadata.proto */
export type ISaveChunkMetadata = {
  anchorX: number,
  anchorY: number,
  width: number,
  height: number,
  id: number,
}
/** as app/electron/handlers/saveMap/MapMetadata.proto */
export type ISaveMetadata = {
  name: string,
  saveTime: string,
  playTime: number,
  chunks: ISaveChunkMetadata[]
}