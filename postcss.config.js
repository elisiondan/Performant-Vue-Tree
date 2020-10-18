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
  path: ['src/'], // Make src path root, to get rid of relative imports
});

const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    importSyntax,
    tailwindcss,
    ...process.env.NODE_ENV === 'production' ? [purgecss] : [],
  ],
};
