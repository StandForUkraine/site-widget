export declare type WidgetVariant = 'button' | 'strip';
declare type WidgetPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
declare type WidgetStripColor = 'black' | 'ua-colors';
declare type WidgetVariantCommonSettings = {
    zIndex?: number;
    margin?: number;
};
export interface WidgetOptions {
    variant?: WidgetVariant;
    button?: WidgetVariantCommonSettings & {
        position?: WidgetPosition;
    };
    strip?: WidgetVariantCommonSettings & {
        color?: WidgetStripColor;
        position?: 'static' | 'fixed';
    };
}
declare type WidgetResult = [
    mount: (container: string | HTMLElement) => void,
    unmount: () => void
];
export declare function createWidget(options?: WidgetOptions): WidgetResult;
export {};
