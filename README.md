# Stand for Ukraine widget

### Size:

| Minified Size | Gzipped Size |
| :-----------: | :----------: |
|   `6.6 KB`    |  `2.97 KB`   |

### Usage:

- Paste the following snippet via script tag to the html before closing the body tag

```js
<script type="text/javascript">
  (function (w, d, t, u, a, m, f) {
    f = function () {
      w.unmountStandForUkraineWidget = w.StandForUkraineWidget.init(document.body, /* options go here */);
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
    'https://cdn.jsdelivr.net/gh/StandForUkraine/site-widget/artifacts/index.min.js'
  );
</script>
```

- Create load function or method in your source code

```js
let loaded = false;
function init() {
  loaded = true;
  window.unmountStandForUkraineWidget = window.StandForUkraineWidget.init(
    document.body /* options go here */,
  );
}

function loadWidgetCode() {
  if (loaded) return;

  const tag = document.createElement('script');
  const firstTag = document.getElementsByTagName('script')[0];
  tag.async = 1;
  tag.onload = init; // mount the widget;
  tag.src =
    'https://cdn.jsdelivr.net/gh/StandForUkraine/site-widget/artifacts/index.min.js';
  firstTag.parentNode.insertBefore(a, m);
}
```

### Options:

| Key                        | Type                                                           | Default                      | Description                                    |
| -------------------------- | -------------------------------------------------------------- | ---------------------------- | ---------------------------------------------- |
| `variant`                  | `'button' \| 'strip'`                                          | `'button'`                   | Choose from 2 view variants                    |
| `button.position`          | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-left'`              | Button position                                |
| `strip.position`           | `'static' \| 'fixed'`                                          | `'fixed'`                    | Strip position                                 |
| `strip.color`              | `'black' \| 'ua-colors'`                                       | `'black'`                    | Choose widget background color                 |
| `{strip \| button}.margin` | `number`                                                       | `20 // button`, `0 // strip` | Widget margin                                  |
| `{strip \| button}.zIndex` | `number`                                                       | `10000`                      | Override default z-index for widget and dialog |
