/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './src/**/*.vue',
    './src/**/*.jsx',
    './fi-api-data/**/*.vue',
    './fi-api-data/**/*.jsx',
  ],
  whitelist: ['html', 'body', 'invisible'],
  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

const importSyntax = require('postcss-import')({
//   addModulesDirectories: ['node_modules'],
//   path: ['node_modules/'],
  skipDuplicates: false,
  //   filter(path, ...args) {
  //     console.warn(path);
  //     console.warn(args);
  //     return path;
  //   },
  resolve(id, basedir, importOptions) {
    console.warn(id);
    console.warn(basedir);
    console.warn(importOptions);
    return id;
  },
//   resolve(id, basedir, importOptions) {
//     console.warn(importOptions.load());
//     return basedir + id.split(1);
//   },
//   path: ['src/'], // Make src path root, to get rid of relative imports
});

const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    importSyntax,
    tailwindcss,
    ...process.env.NODE_ENV === 'production' ? [purgecss] : [],
  ],
};
