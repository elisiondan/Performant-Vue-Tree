// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset',
//   ],
// };

const devPresets = ['@vue/cli-plugin-babel/preset', '@vue/babel-preset-jsx'];
const buildPresets = ['@babel/preset-env', '@babel/preset-typescript', '@vue/babel-preset-jsx'];
module.exports = {
  presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
  plugins: ['@babel/plugin-proposal-class-properties'],
};
