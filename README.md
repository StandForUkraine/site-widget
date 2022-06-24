# Stand for Ukraine widget

### Size:

| Minified Size | Gzipped Size |
| :-----------: | :----------: |
|   `6.34 KB`   |  `2.77 KB`   |

### Usage:

- in code:

```js
import StandForUkraineWidget from 'some-source';

console.log(StandForUkraineWidget.version); // x.x.x

const options = {};

// Creates and mount the widget
// Expects as the first argument css selector or physical dom node
const unmount = StandForUkraineWidget.init('#element-id', options);

// ...
// Later if you need remove widget
unmount();
```

- script

```js
<script type="text/javascript">
  (function (w, d, t, u, a, m, f) {
    f = function () {
      const unmount = w.StandForUkraineWidget.init('#root', {
        variant: 'strip',
        settings: {
          zIndex: 20000,
        },
      });
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
    '//localhost:${port}/index.js'
  );
</script>
```

### Options:

| Key                 | Type                                                           | Default         | Description                                               |
| ------------------- | -------------------------------------------------------------- | --------------- | --------------------------------------------------------- |
| `variant`           | `'button' \| 'strip'`                                          | `'button'`      | Choose from 2 view variants                               |
| `settings.zIndex`   | `number`                                                       | `10000`         | Override default z-index for widget and dialog            |
| `settings.position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-left'` | Position of the widget (only for `button` variant)        |
| `settings.margin`   | `number`                                                       | `20`            | Widget margin (only for `button` variant)                 |
| `settings.color`    | `black`                                                        | `'black'`       | Choose widget background color (only for `strip` variant) |
