import type {Theme} from '../types.js';

export type ValueWithReference = {
    /* Pure color value without reference to other variable */
    value: string;
    /* Name of the associated CSS variable (example --g-color-private-orange-800) */
    ref?: string;
};

export type ThemizedValueWithReference = Record<Theme, ValueWithReference>;

export const isValueWithReference = (obj: unknown): obj is ValueWithReference => {
    return typeof obj === 'object' && obj !== null && 'value' in obj;
};

export const isThemizedValueWithReference = (obj: unknown): obj is ThemizedValueWithReference => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'light' in obj &&
        isValueWithReference(obj.light) &&
        'dark' in obj &&
        isValueWithReference(obj.dark)
    );
};

export type JsonTheme = Record<string, ThemizedValueWithReference | ValueWithReference>;
