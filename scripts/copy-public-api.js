/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs-extra');

async function copyPublicApi() {
  try {
    await fs.ensureDir('./dist/services');
    await fs.copyFile('./src/services/tree-observer.ts', './dist/services/tree-observer.ts');
  } catch (error) {
    console.error(error);
  }
}

copyPublicApi();
