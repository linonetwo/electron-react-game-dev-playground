const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
exports.isDev = isDev;
const resourcesPath = isDev
  ? path.join(__dirname, '../../', 'resources')
  : process.resourcesPath;
exports.resourcesPath = resourcesPath;

exports.iconPath = path.join(resourcesPath, 'icon.icns');
