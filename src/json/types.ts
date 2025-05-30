import type {Theme} from '../types.js';

export type ValueWithReference = {
    /* Pure color value without reference to other variable */
    value: string;
    /* Name of the associated CSS variable (example --g-color-private-orange-800) */
    ref?: string;
};

export type ThemizedValueWithReference = Record<Theme, ValueWithReference>;

/**
 * Checks if an object is a valid ValueWithReference.
 * @param obj - The object to check
 * @returns True if the object is a valid ValueWithReference
 */
export const isValueWithReference = (obj: unknown): obj is ValueWithReference => {
    return typeof obj === 'object' && obj !== null && 'value' in obj;
};

/**
 * Checks if an object is a valid ThemizedValueWithReference.
 * @param obj - The object to check
 * @returns True if the object is a valid ThemizedValueWithReference
 */
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

/**
 * JSON theme representation.
 * @example
 * {
 *     '--g-color-brand-heavy': {
 *         dark: { value: 'rgb(0, 0, 0)' },
 *         light: { value: 'rgb(255, 119, 0)' }
 *     }
 * }
 */
export type JsonTheme = Record<string, ValueWithReference | ThemizedValueWithReference>;
