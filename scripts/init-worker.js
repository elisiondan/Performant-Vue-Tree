/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const moduleName = 'performant-vue-tree';
const workerName = 'tree-traversal-worker.js';

const src = path.join('node_modules', moduleName, 'dist', workerName);
const dst = path.join('public', workerName);

try {
  fs.copyFileSync(src, dst, fs.constants.COPYFILE_EXCL);
} catch (error) {
  console.log(error);
}
