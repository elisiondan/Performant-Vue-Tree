/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const scriptName = 'init-worker.js';

const src = path.join('scripts', scriptName);
const dst = path.join('dist', scriptName);

try {
  fs.copyFileSync(src, dst);
} catch (error) {
  console.log(error);
}
