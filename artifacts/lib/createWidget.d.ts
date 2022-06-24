export declare type WidgetVariant = 'button' | 'strip';
declare type WidgetPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
declare type WidgetStripColor = 'black' | 'ua-colors';
declare type WidgetSettings<V extends WidgetVariant> = V extends 'button' ? {
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
declare type WidgetResult = [
    mount: (container: string | HTMLElement) => void,
    unmount: () => void
];
export declare function createWidget<V extends WidgetVariant = 'button'>(options?: WidgetOptions<V>): WidgetResult;
export {};
