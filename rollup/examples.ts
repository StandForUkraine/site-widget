export const examples = [
  `w.StandForUkraineWidget.init('#root');`,
  `w.StandForUkraineWidget.init('#root', { variant: 'strip', strip: { position: 'static' }});`,
  `w.StandForUkraineWidget.init('#root', { variant: 'strip', strip: { position: 'static', color: 'ua-colors' }});`,
  `w.StandForUkraineWidget.init('#root', { variant: 'strip' });`,
  `w.StandForUkraineWidget.init('#root', { variant: 'strip', strip: { color: 'ua-colors' }});`,
];

export const exampleHtmlTemplate = (options: {
  initFn: string;
  version: string;
  title: string;
}): string => `
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>${options.title}</title>
  <style>
    body {
      margin: 0;
    }

    img {
      display: block;
    }
  </style>
</head>

<body>
  <script type="text/javascript">
    (function (w, d, t, u, a, m, f) {
      f = function () {
        ${options.initFn}
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
      'https://cdn.jsdelivr.net/gh/StandForUkraine/site-widget@${options.version}/artifacts/index.min.js'
    );
  </script>
  <div id="root">
    <img src="https://github.com/StandForUkraine/site-widget/raw/main/tool/background.jpg" width="100%" />
    <img src="https://github.com/StandForUkraine/site-widget/raw/main/tool/background.jpg" width="100%" />
  </div>
</body>

</html>
`;
