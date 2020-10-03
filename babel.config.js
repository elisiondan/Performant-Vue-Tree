// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset',
//   ],
// };

const devPresets = ['@vue/cli-plugin-babel/preset'];
const buildPresets = ['@babel/preset-env', '@babel/preset-typescript'];
module.exports = {
  presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-react-jsx'],
};
