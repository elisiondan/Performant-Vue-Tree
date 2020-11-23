// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset',
//   ],
// };

const devPresets = ['@vue/cli-plugin-babel/preset', '@vue/babel-preset-jsx'];
const buildPresets = ['@babel/preset-env', '@babel/preset-typescript', '@vue/babel-preset-jsx'];
module.exports = {
  presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
  plugins: ['@babel/plugin-proposal-class-properties',
    ['@babel/plugin-transform-runtime', {
    // "absoluteRuntime": false,
      corejs: false,
      // "helpers": true,
      regenerator: true,
      runtimeHelpers: true,
    // "useESModules": false
    }]],
};
