import { createWidget, WidgetOptions, WidgetVariant } from './lib/createWidget';

declare const __pkgVersion: string;

const init = (container: string | HTMLElement, options?: WidgetOptions): () => void => {
  const [mount, unmount] = createWidget(options);
  mount(container);
  return unmount;
};

export { WidgetOptions, WidgetVariant };

export default Object.freeze({
  init,
  version: __pkgVersion,
});
