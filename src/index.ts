import { createWidget, WidgetOptions, WidgetVariant } from './lib/createWidget';

declare const __pkgVersion: string;

const init = <V extends WidgetVariant>(container: string | HTMLElement, options?: WidgetOptions<V>): () => void => {
  const [mount, unmount] = createWidget(options);
  mount(container);
  return unmount;
};

export { WidgetOptions };

export default Object.freeze({
  init,
  version: __pkgVersion,
});
