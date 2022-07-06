import lib from './index';

const doc = document;
const _kFallbackScriptId = 'sfuw';

function init() {
  try {
    const script = doc.currentScript ?? doc.getElementById(_kFallbackScriptId);

    if (script === null) {
      throw new Error('Script not found');
    }

    const url = new URL(script.getAttribute('src')!);
    const variant = url.searchParams.get('variant') as never;
    const buttonPos = url.searchParams.get('button-position') as never;
    const zIndex = url.searchParams.get('z-index') as never;
    const stripColor = url.searchParams.get('strip-color') as never

    lib.init(doc.body, {
      variant,
      button: { position: buttonPos, zIndex },
      strip: { color: stripColor, zIndex },
    });
  } catch (error) {
    // Supress an error
  }
}

if (doc.readyState === 'loading') {
  doc.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

