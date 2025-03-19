import {DEFAULT_BORDERS} from './borders/constants.js';
import type {BaseColors, GravityTheme, Theme, UtilityColors} from './types.js';
import {DEFAULT_TYPOGRAPHY_OPTIONS} from './typography/constants.js';
import {generatePrivateColorsForBaseColors, replaceReferencesInUtilityColors} from './utils.js';

const DEFAULT_BRAND_COLOR = 'rgb(203,255,92)';

const DEFAULT_BACKGROUND = {
    dark: 'rgb(34,29,34)',
    light: 'rgb(255,255,255)',
};

const TEXT_CONTRAST_COLORS: Record<Theme, {white: string; black: string}> = {
    dark: {
        white: 'rgb(255, 255, 255)',
        black: 'rgba(0, 0, 0, 0.9)', // --g-color-private-black-900
    },
    light: {
        white: 'rgb(255, 255, 255)',
        black: 'rgba(0, 0, 0, 0.85)', // --g-color-private-black-850
    },
};

export const DEFAULT_BASE_COLORS: BaseColors = {
    white: {
        dark: {value: 'rgb(255, 255, 255)'},
        light: {value: 'rgb(255, 255, 255)'},
    },
    black: {
        dark: {value: 'rgb(0, 0, 0)'},
        light: {value: 'rgb(0, 0, 0)'},
    },
    brand: {
        dark: {value: DEFAULT_BRAND_COLOR},
        light: {value: DEFAULT_BRAND_COLOR},
    },
    orange: {
        dark: {value: 'rgb(200, 99, 12)'},
        light: {value: 'rgb(255, 119, 0)'},
    },
    green: {
        dark: {value: 'rgb(91, 181, 87)'},
        light: {value: 'rgb(59, 201, 53)'},
    },
    yellow: {
        dark: {value: 'rgb(255, 203, 0)'},
        light: {value: 'rgb(255, 219, 77)'},
    },
    red: {
        dark: {value: 'rgb(232, 73, 69)'},
        light: {value: 'rgb(255, 4, 0)'},
    },
    blue: {
        dark: {value: 'rgb(82, 130, 255)'},
        light: {value: 'rgb(82, 130, 255)'},
    },
    'cool-grey': {
        dark: {value: 'rgb(96, 128, 156)'},
        light: {value: 'rgb(107, 132, 153)'},
    },
    purple: {
        dark: {value: 'rgb(143, 82, 204)'},
        light: {value: 'rgb(143, 82, 204)'},
    },
};

const DEFAULT_PRIVATE_COLORS = generatePrivateColorsForBaseColors(
    DEFAULT_BASE_COLORS,
    DEFAULT_BACKGROUND.light,
    DEFAULT_BACKGROUND.dark,
);

const DEFAULT_UTILITY_COLORS: UtilityColors = {
    'base-brand': {
        dark: {value: DEFAULT_BRAND_COLOR},
        light: {value: DEFAULT_BRAND_COLOR},
    },
    'base-background': {
        dark: {value: DEFAULT_BACKGROUND.dark},
        light: {value: DEFAULT_BACKGROUND.light},
    },
    'base-brand-hover': {
        dark: {value: 'private.brand.650-solid'},
        light: {value: 'private.brand.600-solid'},
    },
    'base-selection': {
        dark: {value: 'private.brand.150'},
        light: {value: 'private.brand.200'},
    },
    'base-selection-hover': {
        dark: {value: 'private.brand.200'},
        light: {value: 'private.brand.300'},
    },
    'line-brand': {
        dark: {value: 'private.brand.600-solid'},
        light: {value: 'private.brand.600-solid'},
    },
    'text-brand': {
        dark: {value: 'private.brand.600-solid'},
        light: {value: 'private.brand.700-solid'},
    },
    'text-brand-heavy': {
        dark: {value: 'private.brand.700-solid'},
        light: {value: 'private.brand.700-solid'},
    },
    'text-brand-contrast': {
        dark: {value: TEXT_CONTRAST_COLORS.dark.black},
        light: {value: TEXT_CONTRAST_COLORS.light.black},
    },
    'text-link': {
        dark: {value: 'private.brand.550-solid'},
        light: {value: 'private.brand.600-solid'},
    },
    'text-link-hover': {
        dark: {value: 'private.brand.700-solid'},
        light: {value: 'private.brand.800-solid'},
    },
    'text-link-visited': {
        dark: {value: 'private.purple.700-solid'},
        light: {value: 'private.purple.550-solid'},
    },
    'text-link-visited-hover': {
        dark: {value: 'private.purple.850-solid'},
        light: {value: 'private.purple.800-solid'},
    },
};

export const DEFAULT_THEME: GravityTheme = {
    baseColors: DEFAULT_BASE_COLORS,
    privateColors: DEFAULT_PRIVATE_COLORS,
    utilityColors: replaceReferencesInUtilityColors(DEFAULT_UTILITY_COLORS, DEFAULT_PRIVATE_COLORS),
    typography: DEFAULT_TYPOGRAPHY_OPTIONS,
    borders: DEFAULT_BORDERS,
};
