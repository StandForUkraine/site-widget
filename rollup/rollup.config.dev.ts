import { RollupOptions } from 'rollup';
import { config as commonConfig } from './rollup.config.common';
import dev from 'rollup-plugin-dev';
import html, { RollupHtmlTemplateOptions } from '@rollup/plugin-html';

const port = typeof process.env.PORT !== 'undefined' ? parseInt(process.env.PORT!) : 5555;

const template = (options: RollupHtmlTemplateOptions | undefined) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>${options!.title}</title>
  </head>
  <body>
    <script id="sfuw" type="text/javascript" async="true" src="http://localhost:${port}/index.dev.iife.js?variant=strip&strip-color=ua-colors"></script>
    <div id="root"></div>
  </body>
</html>
`

const configs: RollupOptions[] = [
  {
    input: './src/index.dev.ts',
    output: {
      ...commonConfig.output,
      sourcemap: true,
      file: `dist/index.dev.js`,
    },
    plugins: [
      ...commonConfig.plugins as never,
      html(),
      dev({
        dirs: ['dist'],
        port,
      }),
    ]
  },
  {
    ...commonConfig,
    input: './src/index.iife.ts',
    output: {
      ...commonConfig.output,
      file: `dist/index.dev.iife.js`,
      format: 'iife',
    },
    plugins: [
      ...commonConfig.plugins as never,
      html({ template, fileName: 'index.iife.html' }),
    ]
  }
];

export default configs;
