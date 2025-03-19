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

export const isColorOptions = (obj: unknown): obj is ColorOptions => {
    return typeof obj === 'object' && obj !== null && 'value' in obj;
};

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
    brand: ThemizedColorOptions;
    [key: string]: ThemizedColorOptions;
};

export const UTILITY_COLORS = [
    'base-brand',
    'base-background',
    'base-brand-hover',
    'base-selection',
    'base-selection-hover',
    'line-brand',
    'text-brand',
    'text-brand-heavy',
    'text-brand-contrast',
    'text-link',
    'text-link-hover',
    'text-link-visited',
    'text-link-visited-hover',
] as const;

export type UtilityColor = (typeof UTILITY_COLORS)[number];
export type UtilityColors = Record<UtilityColor, ThemizedColorOptions>;

export type PrivateColorOptions = Partial<Record<AnyPrivateColorToken, ColorOptions>>;

export type ThemizedPrivateColorOptions = Record<Theme, PrivateColorOptions>;

export type PrivateColors = {
    brand: ThemizedPrivateColorOptions;
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
