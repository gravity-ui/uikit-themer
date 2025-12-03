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
    // text
    'text-brand': {
        dark: {value: createInternalPrivateColorReference('yellow', '600-solid')},
        light: {value: createInternalPrivateColorReference('yellow', '700-solid')},
    },
    'text-brand-heavy': {
        dark: {value: createInternalPrivateColorReference('yellow', '700-solid')},
        light: {value: createInternalPrivateColorReference('orange', '700-solid')},
    },
    'text-brand-contrast': {
        dark: {value: createInternalUtilityColorReference('text-light-primary')},
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
        dark: {value: createInternalUtilityColorReference('text-light-primary')},
        light: {value: createInternalUtilityColorReference('text-dark-primary')},
    },
    'text-complementary': {
        dark: {value: createInternalUtilityColorReference('text-light-complementary')},
        light: {value: createInternalUtilityColorReference('text-dark-complementary')},
    },
    'text-secondary': {
        dark: {value: createInternalUtilityColorReference('text-light-secondary')},
        light: {value: createInternalUtilityColorReference('text-dark-secondary')},
    },
    'text-hint': {
        dark: {value: createInternalUtilityColorReference('text-light-hint')},
        light: {value: createInternalUtilityColorReference('text-dark-hint')},
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
    // base
    'base-background': {
        dark: {value: DEFAULT_BACKGROUND.dark},
        light: {value: createInternalPrivateColorReference('white', '1000-solid')},
    },
    'base-brand': {
        dark: {value: createInternalPrivateColorReference('yellow', '550-solid')},
        light: {value: createInternalPrivateColorReference('yellow', '550-solid')},
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
    'base-generic': {
        dark: {value: createInternalPrivateColorReference('white', '100')},
        light: {value: createInternalPrivateColorReference('black', '50')},
    },
    'base-generic-hover': {
        dark: {value: createInternalPrivateColorReference('white', '150')},
        light: {value: createInternalPrivateColorReference('black', '150')},
    },
    'base-generic-medium': {
        dark: {value: createInternalPrivateColorReference('white', '250')},
        light: {value: createInternalPrivateColorReference('black', '150')},
    },
    'base-generic-medium-hover': {
        dark: {value: createInternalPrivateColorReference('white', '300')},
        light: {value: createInternalPrivateColorReference('black', '250')},
    },
    'base-generic-accent': {
        dark: {value: createInternalPrivateColorReference('white', '150')},
        light: {value: createInternalPrivateColorReference('black', '150')},
    },
    'base-generic-accent-disabled': {
        dark: {value: createInternalPrivateColorReference('white', '70')},
        light: {value: createInternalPrivateColorReference('black', '70')},
    },
    'base-generic-ultralight': {
        dark: {value: createInternalPrivateColorReference('white', '20-solid')},
        light: {value: createInternalPrivateColorReference('black', '20-solid')},
    },
    'base-simple-hover': {
        dark: {value: createInternalPrivateColorReference('white', '100')},
        light: {value: createInternalPrivateColorReference('black', '50')},
    },
    'base-simple-hover-solid': {
        dark: {value: createInternalPrivateColorReference('white', '100-solid')},
        light: {value: createInternalPrivateColorReference('black', '50-solid')},
    },
    'base-info-light': {
        dark: {value: createInternalPrivateColorReference('blue', '150')},
        light: {value: createInternalPrivateColorReference('blue', '100')},
    },
    'base-info-light-hover': {
        dark: {value: createInternalPrivateColorReference('blue', '200')},
        light: {value: createInternalPrivateColorReference('blue', '200')},
    },
    'base-info-medium': {
        dark: {value: createInternalPrivateColorReference('blue', '300')},
        light: {value: createInternalPrivateColorReference('blue', '200')},
    },
    'base-info-medium-hover': {
        dark: {value: createInternalPrivateColorReference('blue', '400')},
        light: {value: createInternalPrivateColorReference('blue', '300')},
    },
    'base-info-heavy': {
        dark: {value: createInternalPrivateColorReference('blue', '600-solid')},
        light: {value: createInternalPrivateColorReference('blue', '600-solid')},
    },
    'base-info-heavy-hover': {
        dark: {value: createInternalPrivateColorReference('blue', '700-solid')},
        light: {value: createInternalPrivateColorReference('blue', '700-solid')},
    },
    'base-positive-light': {
        dark: {value: createInternalPrivateColorReference('green', '150')},
        light: {value: createInternalPrivateColorReference('green', '100')},
    },
    'base-positive-light-hover': {
        dark: {value: createInternalPrivateColorReference('green', '200')},
        light: {value: createInternalPrivateColorReference('green', '200')},
    },
    'base-positive-medium': {
        dark: {value: createInternalPrivateColorReference('green', '300')},
        light: {value: createInternalPrivateColorReference('green', '200')},
    },
    'base-positive-medium-hover': {
        dark: {value: createInternalPrivateColorReference('green', '400')},
        light: {value: createInternalPrivateColorReference('green', '300')},
    },
    'base-positive-heavy': {
        dark: {value: createInternalPrivateColorReference('green', '600-solid')},
        light: {value: createInternalPrivateColorReference('green', '600-solid')},
    },
    'base-positive-heavy-hover': {
        dark: {value: createInternalPrivateColorReference('green', '700-solid')},
        light: {value: createInternalPrivateColorReference('green', '700-solid')},
    },
    'base-warning-light': {
        dark: {value: createInternalPrivateColorReference('yellow', '150')},
        light: {value: createInternalPrivateColorReference('yellow', '200')},
    },
    'base-warning-light-hover': {
        dark: {value: createInternalPrivateColorReference('yellow', '200')},
        light: {value: createInternalPrivateColorReference('yellow', '300')},
    },
    'base-warning-medium': {
        dark: {value: createInternalPrivateColorReference('yellow', '300')},
        light: {value: createInternalPrivateColorReference('yellow', '400')},
    },
    'base-warning-medium-hover': {
        dark: {value: createInternalPrivateColorReference('yellow', '400')},
        light: {value: createInternalPrivateColorReference('yellow', '500')},
    },
    'base-warning-heavy': {
        dark: {value: createInternalPrivateColorReference('yellow', '600-solid')},
        light: {value: createInternalPrivateColorReference('yellow', '550-solid')},
    },
    'base-warning-heavy-hover': {
        dark: {value: createInternalPrivateColorReference('yellow', '700-solid')},
        light: {value: createInternalPrivateColorReference('yellow', '650-solid')},
    },
    'base-danger-light': {
        dark: {value: createInternalPrivateColorReference('red', '150')},
        light: {value: createInternalPrivateColorReference('red', '100')},
    },
    'base-danger-light-hover': {
        dark: {value: createInternalPrivateColorReference('red', '200')},
        light: {value: createInternalPrivateColorReference('red', '200')},
    },
    'base-danger-medium': {
        dark: {value: createInternalPrivateColorReference('red', '300')},
        light: {value: createInternalPrivateColorReference('red', '200')},
    },
    'base-danger-medium-hover': {
        dark: {value: createInternalPrivateColorReference('red', '400')},
        light: {value: createInternalPrivateColorReference('red', '300')},
    },
    'base-danger-heavy': {
        dark: {value: createInternalPrivateColorReference('red', '600-solid')},
        light: {value: createInternalPrivateColorReference('red', '600-solid')},
    },
    'base-danger-heavy-hover': {
        dark: {value: createInternalPrivateColorReference('red', '700-solid')},
        light: {value: createInternalPrivateColorReference('red', '700-solid')},
    },
    'base-utility-light': {
        dark: {value: createInternalPrivateColorReference('purple', '150')},
        light: {value: createInternalPrivateColorReference('purple', '100')},
    },
    'base-utility-light-hover': {
        dark: {value: createInternalPrivateColorReference('purple', '250')},
        light: {value: createInternalPrivateColorReference('purple', '200')},
    },
    'base-utility-medium': {
        dark: {value: createInternalPrivateColorReference('purple', '300')},
        light: {value: createInternalPrivateColorReference('purple', '200')},
    },
    'base-utility-medium-hover': {
        dark: {value: createInternalPrivateColorReference('purple', '400')},
        light: {value: createInternalPrivateColorReference('purple', '300')},
    },
    'base-utility-heavy': {
        dark: {value: createInternalPrivateColorReference('purple', '600-solid')},
        light: {value: createInternalPrivateColorReference('purple', '600-solid')},
    },
    'base-utility-heavy-hover': {
        dark: {value: createInternalPrivateColorReference('purple', '700-solid')},
        light: {value: createInternalPrivateColorReference('purple', '700-solid')},
    },
    'base-neutral-light': {
        dark: {value: createInternalPrivateColorReference('white', '100')},
        light: {value: createInternalPrivateColorReference('black', '50')},
    },
    'base-neutral-light-hover': {
        dark: {value: createInternalPrivateColorReference('white', '150')},
        light: {value: createInternalPrivateColorReference('black', '100')},
    },
    'base-neutral-medium': {
        dark: {value: createInternalPrivateColorReference('white', '250')},
        light: {value: createInternalPrivateColorReference('black', '200')},
    },
    'base-neutral-medium-hover': {
        dark: {value: createInternalPrivateColorReference('white', '350')},
        light: {value: createInternalPrivateColorReference('black', '250')},
    },
    'base-neutral-heavy': {
        dark: {value: createInternalPrivateColorReference('white', '550')},
        light: {value: createInternalPrivateColorReference('black', '450')},
    },
    'base-neutral-heavy-hover': {
        dark: {value: createInternalPrivateColorReference('white', '650')},
        light: {value: createInternalPrivateColorReference('black', '550')},
    },
    'base-misc-light': {
        dark: {value: createInternalPrivateColorReference('cool-grey', '150')},
        light: {value: createInternalPrivateColorReference('cool-grey', '100')},
    },
    'base-misc-light-hover': {
        dark: {value: createInternalPrivateColorReference('cool-grey', '200')},
        light: {value: createInternalPrivateColorReference('cool-grey', '200')},
    },
    'base-misc-medium': {
        dark: {value: createInternalPrivateColorReference('cool-grey', '300')},
        light: {value: createInternalPrivateColorReference('cool-grey', '200')},
    },
    'base-misc-medium-hover': {
        dark: {value: createInternalPrivateColorReference('cool-grey', '400')},
        light: {value: createInternalPrivateColorReference('cool-grey', '300')},
    },
    'base-misc-heavy': {
        dark: {value: createInternalPrivateColorReference('cool-grey', '600-solid')},
        light: {value: createInternalPrivateColorReference('cool-grey', '600-solid')},
    },
    'base-misc-heavy-hover': {
        dark: {value: createInternalPrivateColorReference('cool-grey', '700-solid')},
        light: {value: createInternalPrivateColorReference('cool-grey', '700-solid')},
    },
    'base-light': {
        dark: {value: createInternalPrivateColorReference('white', '850')},
        light: {value: createInternalPrivateColorReference('white', '1000-solid')},
    },
    'base-light-hover': {
        dark: {value: createInternalPrivateColorReference('white', '700')},
        light: {value: createInternalPrivateColorReference('white', '850')},
    },
    'base-light-simple-hover': {
        dark: {value: createInternalPrivateColorReference('white', '150')},
        light: {value: createInternalPrivateColorReference('white', '150')},
    },
    'base-light-disabled': {
        dark: {value: createInternalPrivateColorReference('white', '150')},
        light: {value: createInternalPrivateColorReference('white', '150')},
    },
    'base-light-accent-disabled': {
        dark: {value: createInternalPrivateColorReference('white', '300')},
        light: {value: createInternalPrivateColorReference('white', '300')},
    },
    'base-float': {
        dark: {value: createInternalPrivateColorReference('white', '100-solid')},
        light: {value: createInternalPrivateColorReference('white', '1000-solid')},
    },
    'base-float-hover': {
        dark: {value: createInternalPrivateColorReference('white', '150-solid')},
        light: {value: createInternalPrivateColorReference('black', '50-solid')},
    },
    'base-float-medium': {
        dark: {value: createInternalPrivateColorReference('white', '150-solid')},
        light: {value: createInternalPrivateColorReference('black', '550-solid')},
    },
    'base-float-heavy': {
        dark: {value: createInternalPrivateColorReference('white', '250-solid')},
        light: {value: createInternalPrivateColorReference('black', '700-solid')},
    },
    'base-float-accent': {
        dark: {value: createInternalPrivateColorReference('white', '150-solid')},
        light: {value: createInternalPrivateColorReference('white', '1000-solid')},
    },
    'base-float-accent-hover': {
        dark: {value: createInternalPrivateColorReference('white', '200-solid')},
        light: {value: createInternalPrivateColorReference('white', '850')},
    },
    'base-float-announcement': {
        dark: {value: createInternalPrivateColorReference('white', '150-solid')},
        light: {value: createInternalPrivateColorReference('cool-grey', '50-solid')},
    },
    'base-modal': {
        dark: {value: createInternalUtilityColorReference('base-background')},
        light: {value: createInternalUtilityColorReference('base-background')},
    },
    // line
    'line-generic': {
        dark: {value: createInternalPrivateColorReference('white', '150')},
        light: {value: createInternalPrivateColorReference('black', '100')},
    },
    'line-generic-hover': {
        dark: {value: createInternalPrivateColorReference('white', '250')},
        light: {value: createInternalPrivateColorReference('black', '150')},
    },
    'line-generic-active': {
        dark: {value: createInternalPrivateColorReference('white', '300')},
        light: {value: createInternalPrivateColorReference('black', '300')},
    },
    'line-generic-accent': {
        dark: {value: createInternalPrivateColorReference('white', '150')},
        light: {value: createInternalPrivateColorReference('black', '150')},
    },
    'line-generic-accent-hover': {
        dark: {value: createInternalPrivateColorReference('white', '300')},
        light: {value: createInternalPrivateColorReference('black', '300')},
    },
    'line-generic-solid': {
        dark: {value: createInternalPrivateColorReference('white', '150-solid')},
        light: {value: createInternalPrivateColorReference('black', '100-solid')},
    },
    'line-brand': {
        dark: {value: createInternalPrivateColorReference('yellow', '600-solid')},
        light: {value: createInternalPrivateColorReference('yellow', '600-solid')},
    },
    'line-focus': {
        dark: {value: createInternalPrivateColorReference('cool-grey', '450')},
        light: {value: createInternalPrivateColorReference('cool-grey', '450')},
    },
    'line-light': {
        dark: {value: createInternalPrivateColorReference('white', '500')},
        light: {value: createInternalPrivateColorReference('white', '500')},
    },
    'line-info': {
        dark: {value: createInternalPrivateColorReference('blue', '450')},
        light: {value: createInternalPrivateColorReference('blue', '450')},
    },
    'line-positive': {
        dark: {value: createInternalPrivateColorReference('green', '450')},
        light: {value: createInternalPrivateColorReference('green', '450')},
    },
    'line-warning': {
        dark: {value: createInternalPrivateColorReference('yellow', '450')},
        light: {value: createInternalPrivateColorReference('yellow', '450')},
    },
    'line-danger': {
        dark: {value: createInternalPrivateColorReference('red', '450')},
        light: {value: createInternalPrivateColorReference('red', '450')},
    },
    'line-utility': {
        dark: {value: createInternalPrivateColorReference('purple', '450')},
        light: {value: createInternalPrivateColorReference('purple', '450')},
    },
    'line-misc': {
        dark: {value: createInternalPrivateColorReference('cool-grey', '450')},
        light: {value: createInternalPrivateColorReference('cool-grey', '450')},
    },
    // sfx
    'sfx-veil': {
        dark: {value: createInternalPrivateColorReference('black', '600')},
        light: {value: createInternalPrivateColorReference('black', '250')},
    },
    'sfx-shadow': {
        dark: {value: createInternalPrivateColorReference('black', '200')},
        light: {value: createInternalPrivateColorReference('black', '150')},
    },
    'sfx-shadow-heavy': {
        dark: {value: createInternalPrivateColorReference('black', '500')},
        light: {value: createInternalPrivateColorReference('black', '500')},
    },
    'sfx-shadow-light': {
        dark: {value: createInternalPrivateColorReference('black', '200')},
        light: {value: createInternalPrivateColorReference('black', '50')},
    },
    'sfx-fade': {
        dark: {value: createInternalPrivateColorReference('white', '250')},
        light: {value: createInternalPrivateColorReference('white', '300')},
    },
    // system
    'scroll-track': {
        dark: {value: createInternalUtilityColorReference('base-background')},
        light: {value: createInternalUtilityColorReference('base-background')},
    },
    'scroll-handle': {
        dark: {value: createInternalPrivateColorReference('white', '150')},
        light: {value: createInternalPrivateColorReference('black', '100')},
    },
    'scroll-handle-hover': {
        dark: {value: createInternalPrivateColorReference('white', '250')},
        light: {value: createInternalPrivateColorReference('black', '150')},
    },
    'scroll-corner': {
        dark: {value: createInternalPrivateColorReference('white', '150')},
        light: {value: createInternalPrivateColorReference('black', '100')},
    },
    'infographics-axis': {
        dark: {value: createInternalPrivateColorReference('white', '150-solid')},
        light: {value: createInternalPrivateColorReference('black', '150-solid')},
    },
    'infographics-tooltip-bg': {
        dark: {value: createInternalPrivateColorReference('white', 'opaque-150')},
        light: {value: createInternalPrivateColorReference('white', '950')},
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
