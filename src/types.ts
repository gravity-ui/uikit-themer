import type {BordersOptions} from './borders/types.js';
import type {AnyPrivateColorToken} from './private-colors/types.js';
import type {TypographyOptions} from './typography/types.js';

export type Theme = 'light' | 'dark';

export type ColorOptions = {
    /* Pure color value without reference to other variable */
    value: string;
    /* Name of the associated CSS variable (example --g-color-private-organge-800) */
    ref?: string;
};

export type ThemizedColorOptions = Record<Theme, ColorOptions>;

/**
 * Checks if an object is a valid ColorOptions.
 * @param obj - The object to check
 * @returns True if the object is a valid ColorOptions
 */
export const isColorOptions = (obj: unknown): obj is ColorOptions => {
    return typeof obj === 'object' && obj !== null && 'value' in obj;
};

/**
 * Checks if an object is a valid ThemizedColorOptions.
 * @param obj - The object to check
 * @returns True if the object is a valid ThemizedColorOptions
 */
export const isThemizedColorOptions = (obj: unknown): obj is ThemizedColorOptions => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'light' in obj &&
        isColorOptions(obj.light) &&
        'dark' in obj &&
        isColorOptions(obj.dark)
    );
};

export type BaseColors = {
    [key: string]: ThemizedColorOptions;
};

export const UTILITY_COLORS = [
    // TODO add other base colors
    'base-brand',
    'base-background',
    'base-brand-hover',
    'base-selection',
    'base-selection-hover',

    // TODO add other line colors
    'line-brand',

    'text-primary',
    'text-complementary',
    'text-secondary',
    'text-hint',

    'text-info',
    'text-positive',
    'text-warning',
    'text-danger',
    'text-utility',
    'text-misc',

    'text-info-heavy',
    'text-positive-heavy',
    'text-warning-heavy',
    'text-danger-heavy',
    'text-utility-heavy',
    'text-misc-heavy',

    'text-brand',
    'text-brand-heavy',
    'text-brand-contrast',
    'text-link',
    'text-link-hover',
    'text-link-visited',
    'text-link-visited-hover',

    'text-dark-primary',
    'text-dark-complementary',
    'text-dark-secondary',
    'text-dark-hint',

    'text-light-primary',
    'text-light-complementary',
    'text-light-secondary',
    'text-light-hint',

    'text-inverted-primary',
    'text-inverted-complementary',
    'text-inverted-secondary',
    'text-inverted-hint',
] as const;

export type UtilityColor = (typeof UTILITY_COLORS)[number];
export type UtilityColors = Record<UtilityColor, ThemizedColorOptions>;

export type PrivateColorOptions = Partial<Record<AnyPrivateColorToken, ColorOptions>>;

export type ThemizedPrivateColorOptions = Record<Theme, PrivateColorOptions>;

export type PrivateColors = {
    [key: string]: ThemizedPrivateColorOptions;
};

export type GravityTheme = {
    /** Values of solid colors, from which private colors are calculated */
    baseColors: BaseColors;
    /** Private colors */
    privateColors: PrivateColors;
    /** Utility colors that used in components (background, link, brand-text, etc.) */
    utilityColors: UtilityColors;
    /** Typography (fonts, sizes, etc.) */
    typography: TypographyOptions;
    /** Borders (radius, etc.) */
    borders: BordersOptions;
};

export type GenerateOptions = {
    theme: GravityTheme;
    /** Ignore export values that are equal to default values (from DEFAULT_THEME) */
    ignoreDefaultValues?: boolean;
    /** Add !important to values for preview mode */
    forPreview?: boolean;
};
