import {DEFAULT_BORDERS} from './borders/constants.js';
import type {BaseColors, GravityTheme, Theme, UtilityColors} from './types.js';
import {DEFAULT_TYPOGRAPHY_OPTIONS} from './typography/constants.js';
import {
    createInternalPrivateColorReference,
    generatePrivateColorsForBaseColors,
    replaceReferencesInUtilityColors,
} from './utils.js';

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
        dark: {value: TEXT_CONTRAST_COLORS.dark.black},
        light: {value: TEXT_CONTRAST_COLORS.light.black},
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
