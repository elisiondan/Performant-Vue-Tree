/* eslint-disable import/no-extraneous-dependencies */
import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import babel from 'rollup-plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const esbrowserslist = fs.readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

const config = {
  input: 'src/services/tree-traversal-worker.ts',
  output: {
    file: 'dist/tree-traversal-worker.js',
    name: 'tree-traversal-worker',
    format: 'umd',
    exports: 'named',
  },
  plugins: [
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: esbrowserslist,
          },
        ],
      ],
    }),
    nodeResolve(),
    typescript(),
    commonjs({ transformMixedEsModules: true }),
  ],
};

export default config;
