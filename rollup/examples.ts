export const examples = [
  `?variant=button&button-positon=bottom-left`,
  `?variant=strip&strip-color=ua-colors`,
  `?variant=strip&strip-color=black`,
];

export const exampleHtmlTemplate = (options: {
  params: string;
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
  <script id="sfuw" type="text/javascript" async="true" src="https://cdn.jsdelivr.net/gh/StandForUkraine/site-widget@${options.version}/artifacts/index.iife.min.js${options.params}"></script>
  <div id="root">
    <img src="https://github.com/StandForUkraine/site-widget/raw/main/tool/background.jpg" width="100%" />
    <img src="https://github.com/StandForUkraine/site-widget/raw/main/tool/background.jpg" width="100%" />
  </div>
</body>

</html>
`;
