let gid = 1;

const origin = [104, 116, 116, 112, 115, 58, 47, 47, 115, 116, 97, 110, 100, 102, 111, 114, 117, 107, 114, 97, 105, 110, 101, 46, 99, 111, 109, 47];
const links = [
  [origin, 'Donate'],
  [[...origin, 115, 112, 114, 101, 97, 100, 45, 116, 104, 101, 45, 119, 111, 114, 100], 'Spread the word'],
  [[...origin, 119, 105, 100, 103, 101, 116], 'Share this widget'],
] as [
    donate: [number[], string],
    spreadTheWord: [number[], string],
    widget: [number[], string],
  ];

const flagColors = ['#5f82ff', '#ffdc5f'] as [blue: string, yellow: string];

const sysFontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;';

/**
 * To reduce the amount of text for bundle file
 */
const enum ClassNames {
  buttonRoot,
  buttonPositionTopLeft,
  buttonPositionTopRight,
  buttonPositionBottomRight,
  buttonPositionBottomLeft,
  stripRoot,
  stripColorBlack,
  stripColorUaColors,
  overlay,
  dialog,
  dialogLink,
  dialogLinkLast,
  dialogCloseButton,
}

const defaultStyles = {
  [ClassNames.buttonRoot]: ({ zIndex }: Record<string, string | number>) => `display:flex;align-items:center;justify-content:center;position:fixed;z-index:${zIndex};height:40px;width:40px;border-radius:50%;cursor:pointer;box-shadow:0 10px 16px rgba(42,42,71,.06);background:linear-gradient(to bottom,${flagColors[0]} 50%,${flagColors[1]} 50%);`,
  [ClassNames.buttonPositionTopLeft]: ({ margin }: Record<string, string | number>) => `top:${margin}px;left:${margin}px`,
  [ClassNames.buttonPositionTopRight]: ({ margin }: Record<string, string | number>) => `top:${margin}px;right:${margin}px`,
  [ClassNames.buttonPositionBottomRight]: ({ margin }: Record<string, string | number>) => `bottom:${margin}px;left:${margin}px`,
  [ClassNames.buttonPositionBottomLeft]: ({ margin }: Record<string, string | number>) => `bottom:${margin}px;left:${margin}px`,
  [ClassNames.stripRoot]: `height:35px;text-align:center;font-family:${sysFontFamily};display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;font-weight:400;line-height:19px`,
  [ClassNames.stripColorBlack]: `background-color:#000;color:#fff`,
  [ClassNames.stripColorUaColors]: `background:linear-gradient(to right,${flagColors[0]} 50%,${flagColors[1]} 50%);color:#000;`,
  [ClassNames.overlay]: ({ zIndex }: Record<string, string | number>) => `position:fixed;z-index:${zIndex};top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,.2);display:flex;justify-content:center;align-items:center;`,
  [ClassNames.dialog]: `position:relative;background-color:#fff;display:flex;flex-direction:column;align-items:center;width:200px;border-radius:12px;`,
  [ClassNames.dialogLink]: `text-decoration:none;padding:24px 0;font-weight:700;font-family:${sysFontFamily};font-size:16px;line-height:20px;width:100%;text-align:center;color:#2b2b2d;border-bottom:1px solid #e7e8e8;`,
  [ClassNames.dialogLinkLast]: `border-bottom-width:0!important;`,
  [ClassNames.dialogCloseButton]: `position:absolute;top:-7px;right:-7px;cursor:pointer;`
} as const;

export type WidgetVariant =
  | 'button'
  | 'strip';

type WidgetPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

type WidgetStripColor = 'black' | 'ua-colors';

type WidgetSettings<V extends WidgetVariant> = V extends 'button' ? {
  position?: WidgetPosition;
  margin?: number;
} : {
  color?: WidgetStripColor;
};

export interface WidgetOptions<V extends WidgetVariant> {
  variant?: V;
  settings?: WidgetSettings<V> & {
    zIndex?: number;
  };
}

type WidgetResult = [
  mount: (container: string | HTMLElement) => void,
  unmount: () => void,
]

const positionsAliasToEnum: Record<WidgetPosition, ClassNames> = {
  'top-left': ClassNames.buttonPositionTopLeft,
  'top-right': ClassNames.buttonPositionTopRight,
  'bottom-left': ClassNames.buttonPositionBottomLeft,
  'bottom-right': ClassNames.buttonPositionBottomRight,
};

const colorsAliasToEnum: Record<WidgetStripColor, ClassNames> = {
  'black': ClassNames.stripColorBlack,
  'ua-colors': ClassNames.stripColorUaColors,
};

const vendor = 'stand-for-ukraine';

const defaultSettings = {
  'button': { position: 'bottom-left', margin: 20, zIndex: 10000 },
  'strip': { color: 'black', zIndex: 10000 },
};

export function createWidget<V extends WidgetVariant = 'button'>(options?: WidgetOptions<V>): WidgetResult {
  const doc = document;
  const id = gid++;
  const prefix = `${vendor}-${id}`;
  const variant = options?.variant ?? 'button';
  const settings: WidgetSettings<V> = {
    ...defaultSettings[variant],
    ...(options?.settings ?? {})
  };

  let mounted = false;
  let styles: Partial<Record<ClassNames, string | ((params: Record<string, string | number>) => string)>>;

  filterStyles();

  function widgetHtml(): string {
    if (variant === 'strip') {
      const color = (settings as WidgetSettings<'strip'>).color!;
      return `
      <div id="${prefix}" class="${cls([ClassNames.stripRoot, colorsAliasToEnum[color]])}">
        Help Ukraine ${color !== 'ua-colors' ? '🇺🇦' : ''} Stop the war
      </div>
      `;
    }

    const position = (settings as WidgetSettings<'button'>).position!;
    return `
    <div id="${prefix}" class="${cls([ClassNames.buttonRoot, positionsAliasToEnum[position]])}">
      <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0002 1.48068C6.39999 -1.06083 1.92441 -0.0963199 0.683393 3.44945C-0.132508 5.7806 0.459094 8.37306 2.2055 10.1195L7.93941 15.8535C8.5252 16.4393 9.47495 16.4393 10.0607 15.8535L15.7948 10.1194C17.5412 8.37305 18.1328 5.78062 17.3169 3.4495C16.076 -0.0962713 11.6004 -1.06081 9.0002 1.48068Z" fill="#FFFFFF"/>
      </svg>
    </div>
    `;
  }

  function dialogHtml(): string {
    const decoder = new TextDecoder();
    return `
    <div id="${prefix}-dialog" class="${cls([ClassNames.overlay])}">
      <div class="${cls([ClassNames.dialog])}">
        <svg class="${cls([ClassNames.dialogCloseButton])}" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="7" y="7" width="10" height="11" fill="white"/>
          <path d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM15.5302 14.4698C15.6027 14.5388 15.6608 14.6216 15.7008 14.7133C15.7409 14.805 15.7622 14.9039 15.7635 15.004C15.7648 15.1041 15.746 15.2034 15.7083 15.2961C15.6706 15.3889 15.6147 15.4731 15.5439 15.5439C15.4731 15.6147 15.3889 15.6706 15.2961 15.7083C15.2034 15.746 15.1041 15.7648 15.004 15.7635C14.9039 15.7622 14.805 15.7409 14.7133 15.7008C14.6216 15.6608 14.5388 15.6027 14.4698 15.5302L12 13.0608L9.53016 15.5302C9.38836 15.6649 9.19955 15.7389 9.00398 15.7364C8.8084 15.7339 8.62155 15.6551 8.48325 15.5168C8.34495 15.3785 8.26614 15.1916 8.26364 14.996C8.26114 14.8005 8.33513 14.6116 8.46984 14.4698L10.9392 12L8.46984 9.53016C8.33513 9.38836 8.26114 9.19955 8.26364 9.00398C8.26614 8.8084 8.34495 8.62155 8.48325 8.48325C8.62155 8.34495 8.8084 8.26614 9.00398 8.26364C9.19955 8.26114 9.38836 8.33513 9.53016 8.46984L12 10.9392L14.4698 8.46984C14.6116 8.33513 14.8005 8.26114 14.996 8.26364C15.1916 8.26614 15.3785 8.34495 15.5168 8.48325C15.6551 8.62155 15.7339 8.8084 15.7364 9.00398C15.7389 9.19955 15.6649 9.38836 15.5302 9.53016L13.0608 12L15.5302 14.4698Z" fill="black"/>
        </svg>
        ${links.map(([link, label], index, arr) => `<a href="${decoder.decode(new Uint8Array(link))}" class="${cls([ClassNames.dialogLink, index === arr.length - 1 ? ClassNames.dialogLinkLast : ''])}" target="_blank">${label}</a>`).join('')}
      </div>
    </div>
    `;
  }

  function filterStyles(): void {
    styles = {
      [ClassNames.overlay]: defaultStyles[ClassNames.overlay],
      [ClassNames.dialog]: defaultStyles[ClassNames.dialog],
      [ClassNames.dialogLink]: defaultStyles[ClassNames.dialogLink],
      [ClassNames.dialogLinkLast]: defaultStyles[ClassNames.dialogLinkLast],
      [ClassNames.dialogCloseButton]: defaultStyles[ClassNames.dialogCloseButton],
    };

    if (variant === 'strip') {
      const color = (settings as WidgetSettings<'strip'>).color!;
      styles[ClassNames.stripRoot] = defaultStyles[ClassNames.stripRoot];
      styles[colorsAliasToEnum[color]] = defaultStyles[colorsAliasToEnum[color]];
      return;
    }

    const position = (settings as WidgetSettings<'button'>).position!;
    styles[ClassNames.buttonRoot] = defaultStyles[ClassNames.buttonRoot];
    styles[positionsAliasToEnum[position]] = defaultStyles[positionsAliasToEnum[position]];
  }

  function cls(classNames: (string | ClassNames)[]): string {
    return classNames.filter((className) => typeof className === 'string' ? className.length > 0 : true)
      .map((className) => `${prefix}-${className}`).join(' ');
  }

  function attachStyles(): void {
    const styleElement = doc.createElement('style');

    styleElement.setAttribute('id', `${prefix}-styles`);
    doc.head.appendChild(styleElement);

    const stylesheet = styleElement.sheet!;

    for (const [selector, style] of Object.entries(styles)) {
      stylesheet.insertRule(`.${cls([selector as never])} { ${typeof style === 'function' ? style(settings) : style} }`);
    }
  }

  const hideDialog = (): void => {
    const node = doc.getElementById(`${prefix}-dialog`)!;

    node.querySelector('svg')!.removeEventListener('click', hideDialog);
    node.removeEventListener('click', hideDialog);

    node.parentNode!.removeChild(node);
  };

  const showDialog = (): void => {
    const node = attachElementFromHtml(doc.body, dialogHtml());

    node.querySelector('svg')!.addEventListener('click', hideDialog);
    node.addEventListener('click', hideDialog);
  }

  function mount(container: string | HTMLElement): void {
    if (mounted) {
      return;
    }

    let element: HTMLElement | null = null;

    if (typeof container === 'string') {
      element = doc.querySelector(container);
    } else {
      element = container;
    }

    if (typeof element === 'undefined' || element === null) {
      throw new Error('Element cannot be null');
    }

    attachStyles();

    const node = attachElementFromHtml(element, widgetHtml());

    node.addEventListener('click', showDialog);

    mounted = true;
  }

  function attachElementFromHtml(container: HTMLElement, html: string): HTMLDivElement {
    const root = doc.createElement('div');
    root.innerHTML = html;
    const node = root.querySelector('div')!;
    container.appendChild(node);

    return node;
  }

  function unmount(): void {
    if (!mounted) {
      return;
    }

    const node = doc.getElementById(`${prefix}`)!;
    node.removeEventListener('click', showDialog);
    node.parentNode!.removeChild(node);

    doc.head.removeChild(doc.getElementById(`${prefix}-styles`)!);

    mounted = false;
  }

  return [mount, unmount];
}
