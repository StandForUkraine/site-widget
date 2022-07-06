import { RollupOptions } from 'rollup';
import { config as commonConfig } from './rollup.config.common';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import modify from 'rollup-plugin-modify';
import pkg from '../package.json';
import html from '@rollup/plugin-html';
import { exampleHtmlTemplate, examples } from './examples';

const banner = `/**
 * @preserve
 * Stand for ukraine widget v${pkg.version}
 * @see https://standforukraine.com/widget/
 * @author ${pkg.author}
 */`;

const config1: RollupOptions = {
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
    modify({
      find: /\n\s+/,
      replace: '',
    }),
    filesize(),
  ]
};

const config2: RollupOptions = {
  ...commonConfig,
  input: './src/index.iife.ts',
  output: {
    ...commonConfig.output,
    compact: true,
    file: `artifacts/index.iife.min.js`,
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
    modify({
      find: /\n\s+/,
      replace: '',
    }),
    filesize(),
    ...(examples.map((params, index) => html({
      template: () => exampleHtmlTemplate({
        version: pkg.version,
        title: `Stand for Ukraine widget ${index + 1}`,
        params,
      }),
      fileName: `examples/example.${index + 1}.html`,
    }))),
  ]
};

export default [config1, config2];
