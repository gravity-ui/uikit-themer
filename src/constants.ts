import {DEFAULT_BORDERS} from './borders/constants.js';
import type {BaseColors, GravityTheme, UtilityColors} from './types.js';
import {DEFAULT_TYPOGRAPHY_OPTIONS} from './typography/constants.js';
import {
    createInternalPrivateColorReference,
    createInternalUtilityColorReference,
    generatePrivateColorsForBaseColors,
    replaceReferencesInUtilityColors,
} from './utils.js';

const DEFAULT_BACKGROUND = {
    dark: 'rgb(34,29,34)',
    light: 'rgb(255,255,255)',
};

// Values are taken from the default theme (550-solid)
// Light: https://github.com/gravity-ui/uikit/blob/main/styles/themes/light/private.scss
// Dark: https://github.com/gravity-ui/uikit/blob/main/styles/themes/dark/private.scss
export const DEFAULT_BASE_COLORS: BaseColors = {
    white: {
        dark: {value: 'rgb(255, 255, 255)'},
        light: {value: 'rgb(255, 255, 255)'},
    },
    black: {
        dark: {value: 'rgb(0, 0, 0)'},
        light: {value: 'rgb(0, 0, 0)'},
    },
    orange: {
        dark: {value: 'rgb(200, 99, 12)'},
        light: {value: 'rgb(255, 119, 0)'},
    },
    green: {
        dark: {value: 'rgb(77, 176, 155)'},
        light: {value: 'rgb(50, 186, 118)'},
    },
    yellow: {
        dark: {value: 'rgb(255, 190, 92)'},
        light: {value: 'rgb(255, 190, 92)'},
    },
    red: {
        dark: {value: 'rgb(229, 50, 93)'},
        light: {value: 'rgb(255, 0, 61)'},
    },
    blue: {
        dark: {value: 'rgb(54, 151, 241)'},
        light: {value: 'rgb(54, 151, 241)'},
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

export const DEFAULT_PRIVATE_COLORS = generatePrivateColorsForBaseColors(
    DEFAULT_BASE_COLORS,
    DEFAULT_BACKGROUND.light,
    DEFAULT_BACKGROUND.dark,
);

const DEFAULT_UTILITY_COLORS: UtilityColors = {
    'base-brand': {
        dark: {value: createInternalPrivateColorReference('yellow', '550-solid')},
        light: {value: createInternalPrivateColorReference('yellow', '550-solid')},
    },
    'base-background': {
        dark: {value: DEFAULT_BACKGROUND.dark},
        light: {value: createInternalPrivateColorReference('white', '1000-solid')},
    },
    'base-brand-hover': {
        dark: {value: createInternalPrivateColorReference('yellow', '650-solid')},
        light: {value: createInternalPrivateColorReference('yellow', '600-solid')},
    },
    'base-selection': {
        dark: {value: createInternalPrivateColorReference('yellow', '150')},
        light: {value: createInternalPrivateColorReference('yellow', '200')},
    },
    'base-selection-hover': {
        dark: {value: createInternalPrivateColorReference('yellow', '200')},
        light: {value: createInternalPrivateColorReference('yellow', '300')},
    },
    'line-brand': {
        dark: {value: createInternalPrivateColorReference('yellow', '600-solid')},
        light: {value: createInternalPrivateColorReference('yellow', '600-solid')},
    },
    'text-brand': {
        dark: {value: createInternalPrivateColorReference('yellow', '600-solid')},
        light: {value: createInternalPrivateColorReference('yellow', '700-solid')},
    },
    'text-brand-heavy': {
        dark: {value: createInternalPrivateColorReference('yellow', '700-solid')},
        light: {value: createInternalPrivateColorReference('orange', '700-solid')},
    },
    'text-brand-contrast': {
        dark: {value: createInternalUtilityColorReference('text-dark-primary')},
        light: {value: createInternalUtilityColorReference('text-dark-primary')},
    },
    'text-link': {
        dark: {value: createInternalPrivateColorReference('yellow', '550-solid')},
        light: {value: createInternalPrivateColorReference('yellow', '650-solid')},
    },
    'text-link-hover': {
        dark: {value: createInternalPrivateColorReference('orange', '550-solid')},
        light: {value: createInternalPrivateColorReference('orange', '650-solid')},
    },
    'text-link-visited': {
        dark: {value: createInternalPrivateColorReference('purple', '600-solid')},
        light: {value: createInternalPrivateColorReference('purple', '550-solid')},
    },
    'text-link-visited-hover': {
        dark: {value: createInternalPrivateColorReference('purple', '750-solid')},
        light: {value: createInternalPrivateColorReference('purple', '800-solid')},
    },
    'text-info': {
        dark: {value: createInternalPrivateColorReference('blue', '550-solid')},
        light: {value: createInternalPrivateColorReference('blue', '600-solid')},
    },
    'text-positive': {
        dark: {value: createInternalPrivateColorReference('green', '550-solid')},
        light: {value: createInternalPrivateColorReference('green', '600-solid')},
    },
    'text-warning': {
        dark: {value: createInternalPrivateColorReference('yellow', '550-solid')},
        light: {value: createInternalPrivateColorReference('yellow', '700-solid')},
    },
    'text-danger': {
        dark: {value: createInternalPrivateColorReference('red', '550-solid')},
        light: {value: createInternalPrivateColorReference('red', '600-solid')},
    },
    'text-utility': {
        dark: {value: createInternalPrivateColorReference('purple', '600-solid')},
        light: {value: createInternalPrivateColorReference('purple', '600-solid')},
    },
    'text-misc': {
        dark: {value: createInternalPrivateColorReference('cool-grey', '600-solid')},
        light: {value: createInternalPrivateColorReference('cool-grey', '600-solid')},
    },
    'text-info-heavy': {
        dark: {value: createInternalPrivateColorReference('blue', '600-solid')},
        light: {value: createInternalPrivateColorReference('blue', '700-solid')},
    },
    'text-positive-heavy': {
        dark: {value: createInternalPrivateColorReference('green', '600-solid')},
        light: {value: createInternalPrivateColorReference('green', '700-solid')},
    },
    'text-warning-heavy': {
        dark: {value: createInternalPrivateColorReference('yellow', '600-solid')},
        light: {value: createInternalPrivateColorReference('orange', '700-solid')},
    },
    'text-danger-heavy': {
        dark: {value: createInternalPrivateColorReference('red', '600-solid')},
        light: {value: createInternalPrivateColorReference('red', '700-solid')},
    },
    'text-utility-heavy': {
        dark: {value: createInternalPrivateColorReference('purple', '650-solid')},
        light: {value: createInternalPrivateColorReference('purple', '700-solid')},
    },
    'text-misc-heavy': {
        dark: {value: createInternalPrivateColorReference('cool-grey', '650-solid')},
        light: {value: createInternalPrivateColorReference('cool-grey', '700-solid')},
    },
    'text-primary': {
        dark: {value: createInternalUtilityColorReference('text-dark-primary')},
        light: {value: createInternalUtilityColorReference('text-light-primary')},
    },
    'text-complementary': {
        dark: {value: createInternalUtilityColorReference('text-dark-complementary')},
        light: {value: createInternalUtilityColorReference('text-light-complementary')},
    },
    'text-secondary': {
        dark: {value: createInternalUtilityColorReference('text-dark-secondary')},
        light: {value: createInternalUtilityColorReference('text-light-secondary')},
    },
    'text-hint': {
        dark: {value: createInternalUtilityColorReference('text-dark-hint')},
        light: {value: createInternalUtilityColorReference('text-light-hint')},
    },
    'text-dark-primary': {
        dark: {value: createInternalPrivateColorReference('black', '900')},
        light: {value: createInternalPrivateColorReference('black', '850')},
    },
    'text-dark-complementary': {
        dark: {value: createInternalPrivateColorReference('black', '700')},
        light: {value: createInternalPrivateColorReference('black', '700')},
    },
    'text-dark-secondary': {
        dark: {value: createInternalPrivateColorReference('black', '500')},
        light: {value: createInternalPrivateColorReference('black', '500')},
    },
    'text-dark-hint': {
        dark: {value: createInternalPrivateColorReference('black', '300')},
        light: {value: createInternalPrivateColorReference('black', '300')},
    },
    'text-light-primary': {
        dark: {value: createInternalPrivateColorReference('white', '850')},
        light: {value: createInternalPrivateColorReference('white', '1000-solid')},
    },
    'text-light-complementary': {
        dark: {value: createInternalPrivateColorReference('white', '700')},
        light: {value: createInternalPrivateColorReference('white', '850')},
    },
    'text-light-secondary': {
        dark: {value: createInternalPrivateColorReference('white', '500')},
        light: {value: createInternalPrivateColorReference('white', '700')},
    },
    'text-light-hint': {
        dark: {value: createInternalPrivateColorReference('white', '300')},
        light: {value: createInternalPrivateColorReference('white', '500')},
    },
    'text-inverted-primary': {
        dark: {value: createInternalUtilityColorReference('text-dark-primary')},
        light: {value: createInternalUtilityColorReference('text-light-primary')},
    },
    'text-inverted-complementary': {
        dark: {value: createInternalUtilityColorReference('text-dark-complementary')},
        light: {value: createInternalUtilityColorReference('text-light-complementary')},
    },
    'text-inverted-secondary': {
        dark: {value: createInternalUtilityColorReference('text-dark-secondary')},
        light: {value: createInternalUtilityColorReference('text-light-secondary')},
    },
    'text-inverted-hint': {
        dark: {value: createInternalUtilityColorReference('text-dark-hint')},
        light: {value: createInternalUtilityColorReference('text-light-hint')},
    },
};

export const DEFAULT_THEME_UTILITY_COLORS = replaceReferencesInUtilityColors(
    DEFAULT_UTILITY_COLORS,
    DEFAULT_PRIVATE_COLORS,
);

export const DEFAULT_THEME: GravityTheme = {
    baseColors: DEFAULT_BASE_COLORS,
    privateColors: DEFAULT_PRIVATE_COLORS,
    utilityColors: DEFAULT_THEME_UTILITY_COLORS,
    typography: DEFAULT_TYPOGRAPHY_OPTIONS,
    borders: DEFAULT_BORDERS,
};
