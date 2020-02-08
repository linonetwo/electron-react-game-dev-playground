const { existsSync } = require('fs');
const fs = require('fs').promises;

const { getSaveDirPath } = require('./getSaveDir');

async function readAvailableSaves() {
  const saveDirPath = getSaveDirPath();
  if (!existsSync(saveDirPath)) return [];
  return fs.readdir(saveDirPath);
}
exports.readAvailableSaves = readAvailableSaves;
