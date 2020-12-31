import dts from 'rollup-plugin-dts';

const config = {
  input: 'src/public-types/declarations.d.ts',
  output: {
    file: 'bla.d.ts',
  },
  plugins: [dts()],
};

export default config;
