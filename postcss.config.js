/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const postcssImport = require('postcss-import')({
  path: ['src/'], // Make src path root, to get rid of relative imports
});

module.exports = {
  plugins: [
    postcssImport,
    tailwindcss,
    autoprefixer,
  ],
};
