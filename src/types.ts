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

// From https://github.com/gravity-ui/uikit/blob/main/styles/themes/light/text.scss
export const UTILITY_TEXT_COLORS = [
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

// From https://github.com/gravity-ui/uikit/blob/main/styles/themes/light/base.scss
export const UTILITY_BASE_COLORS = [
    'base-background',
    'base-generic',
    'base-generic-hover',
    'base-generic-medium',
    'base-generic-medium-hover',
    'base-generic-accent',
    'base-generic-accent-disabled',
    'base-generic-ultralight',
    'base-simple-hover',
    'base-simple-hover-solid',

    'base-brand',
    'base-brand-hover',
    'base-selection',
    'base-selection-hover',

    'base-info-light',
    'base-info-light-hover',
    'base-info-medium',
    'base-info-medium-hover',
    'base-info-heavy',
    'base-info-heavy-hover',

    'base-positive-light',
    'base-positive-light-hover',
    'base-positive-medium',
    'base-positive-medium-hover',
    'base-positive-heavy',
    'base-positive-heavy-hover',

    'base-warning-light',
    'base-warning-light-hover',
    'base-warning-medium',
    'base-warning-medium-hover',
    'base-warning-heavy',
    'base-warning-heavy-hover',

    'base-danger-light',
    'base-danger-light-hover',
    'base-danger-medium',
    'base-danger-medium-hover',
    'base-danger-heavy',
    'base-danger-heavy-hover',

    'base-utility-light',
    'base-utility-light-hover',
    'base-utility-medium',
    'base-utility-medium-hover',
    'base-utility-heavy',
    'base-utility-heavy-hover',

    'base-neutral-light',
    'base-neutral-light-hover',
    'base-neutral-medium',
    'base-neutral-medium-hover',
    'base-neutral-heavy',
    'base-neutral-heavy-hover',

    'base-misc-light',
    'base-misc-light-hover',
    'base-misc-medium',
    'base-misc-medium-hover',
    'base-misc-heavy',
    'base-misc-heavy-hover',

    'base-light',
    'base-light-hover',
    'base-light-simple-hover',
    'base-light-disabled',
    'base-light-accent-disabled',

    'base-float',
    'base-float-hover',
    'base-float-medium',
    'base-float-heavy',
    'base-float-accent',
    'base-float-accent-hover',
    'base-float-announcement',
    'base-modal',
] as const;

// From https://github.com/gravity-ui/uikit/blob/main/styles/themes/light/line.scss
export const UTILITY_LINE_COLORS = [
    'line-generic',
    'line-generic-hover',
    'line-generic-active',
    'line-generic-accent',
    'line-generic-accent-hover',
    'line-generic-solid',

    'line-brand',
    'line-focus',
    'line-light',

    'line-info',
    'line-positive',
    'line-warning',
    'line-danger',
    'line-utility',
    'line-misc',
] as const;

// From https://github.com/gravity-ui/uikit/blob/main/styles/themes/light/sfx.scss
export const UTILITY_SFX_COLORS = [
    'sfx-veil',
    'sfx-shadow',
    'sfx-shadow-heavy',
    'sfx-shadow-light',
    'sfx-fade',
] as const;

// From https://github.com/gravity-ui/uikit/blob/main/styles/themes/light/system.scss
export const UTILITY_SYSTEM_COLORS = [
    'scroll-track',
    'scroll-handle',
    'scroll-handle-hover',
    'scroll-corner',

    'infographics-axis',
    'infographics-tooltip-bg',
] as const;

export const UTILITY_COLORS = [
    ...UTILITY_TEXT_COLORS,
    ...UTILITY_BASE_COLORS,
    ...UTILITY_LINE_COLORS,
    ...UTILITY_SFX_COLORS,
    ...UTILITY_SYSTEM_COLORS,
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
