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
    <script type="text/javascript">
      (function (w, d, t, u, a, m, f) {
        f = function () {
          w.StandForUkraineWidget.init('#root', { variant: 'strip', settings: { zIndex: 20000 } });
        };

        a = d.createElement(t);
        m = d.getElementsByTagName(t)[0];
        a.async = 1;
        a.onload = f;
        a.src = u;
        m.parentNode.insertBefore(a, m);
      })(
        window,
        document,
        'script',
        '//localhost:${port}/index.dev.iife.js'
      );
    </script>
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
    output: {
      ...commonConfig.output,
      file: `dist/index.dev.iife.js`,
    },
    plugins: [
      ...commonConfig.plugins as never,
      html({ template, fileName: 'index.iife.html' }),
    ]
  }
];

export default configs;
