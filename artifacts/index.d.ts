import { WidgetOptions, WidgetVariant } from './lib/createWidget';
export { WidgetOptions };
declare const _default: Readonly<{
    init: <V extends WidgetVariant>(container: string | HTMLElement, options?: WidgetOptions<V> | undefined) => () => void;
    version: string;
}>;
export default _default;
