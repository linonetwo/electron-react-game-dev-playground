const path = require('path');
const { existsSync } = require('fs');
const fs = require('fs').promises;

const { resourcesPath } = require('../../constants');

function getSaveDirPath(mapName) {
  return mapName
    ? path.join(resourcesPath, 'saves', mapName)
    : path.join(resourcesPath, 'saves');
}
async function ensureSaveDir(mapName) {
  const saveDirPath = getSaveDirPath(mapName);
  if (!existsSync(saveDirPath)) {
    await fs.mkdir(saveDirPath, { recursive: true });
  }
  return saveDirPath;
}

exports.getSaveDirPath = getSaveDirPath;
exports.ensureSaveDir = ensureSaveDir;
