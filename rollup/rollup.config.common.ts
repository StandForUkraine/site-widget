import { RollupOptions } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import pkg from '../package.json';

export const config: RollupOptions = {
  input: './src/index.ts',
  context: 'window',
  output: {
    format: 'umd',
    name: 'StandForUkraineWidget',
  },
  plugins: [
    typescript(),
    replace({
      preventAssignment: true,
      values: {
        __pkgVersion: JSON.stringify(pkg.version),
      }
    })
  ],
};
