import { RollupOptions } from 'rollup';
import { config as commonConfig } from './rollup.config.common';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import pkg from '../package.json';

const banner = `/**
 * @preserve
 * Stand for ukraine widget v${pkg.version}
 * @see https://standforukraine.com/widget/
 * @author ${pkg.author}
 */`;

const config: RollupOptions = {
  ...commonConfig,
  output: {
    ...commonConfig.output,
    compact: true,
    file: `artifacts/index.min.js`,
    banner,
  },
  plugins: [
    ...commonConfig.plugins as never,
    terser({
      format: {
        comments: (node, comment): boolean => {
          const text = comment.value;
          const type = comment.type;
          if (type === 'comment2') {
            return /@preserve/i.test(text);
          }

          return false;
        }
      }
    }),
    filesize(),
  ]
};

export default config;
