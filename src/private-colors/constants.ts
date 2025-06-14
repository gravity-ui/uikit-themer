import type {AnyPrivateColorToken, PrivateColorToken, PrivateSolidColorToken} from './types.js';

export const ALL_PRIVATE_VARIABLES: AnyPrivateColorToken[] = [
    '1000-solid',
    '950-solid',
    '900-solid',
    '850-solid',
    '800-solid',
    '750-solid',
    '700-solid',
    '650-solid',
    '600-solid',
    '550-solid',
    '500-solid',
    '450-solid',
    '400-solid',
    '350-solid',
    '300-solid',
    '250-solid',
    '200-solid',
    '150-solid',
    '100-solid',
    '70-solid',
    '50-solid',
    '20-solid',
    '950',
    '900',
    '850',
    '800',
    '750',
    '700',
    '650',
    '600',
    '550',
    '500',
    '450',
    '400',
    '350',
    '300',
    '250',
    '200',
    '150',
    '100',
    '70',
    '50',
    '20',
    'opaque-150',
];

export const BASE_PRIVATE_SOLID_VARIABLES: PrivateSolidColorToken[] = [
    '1000-solid',
    '950-solid',
    '900-solid',
    '850-solid',
    '800-solid',
    '750-solid',
    '700-solid',
    '650-solid',
    '600-solid',
    '550-solid',
    '500-solid',
    '450-solid',
    '400-solid',
    '350-solid',
    '300-solid',
    '250-solid',
    '200-solid',
    '150-solid',
    '100-solid',
    '50-solid',
];

export const BASE_PRIVATE_VARIABLES: PrivateColorToken[] = [
    '500',
    '450',
    '400',
    '350',
    '300',
    '250',
    '200',
    '150',
    '100',
    '50',
];

export const LIGHT__WHITE_PRIVATE_VARIABLES: PrivateColorToken[] = [
    ...BASE_PRIVATE_VARIABLES,
    '950',
    '900',
    '850',
    '800',
    '750',
    '700',
    '650',
    '600',
    '70',
];

export const DARK__WHITE_PRIVATE_VARIABLES: PrivateColorToken[] = [
    ...LIGHT__WHITE_PRIVATE_VARIABLES,
    'opaque-150',
];

export const DARK__WHITE_PRIVATE_SOLID_VARIABLES: PrivateSolidColorToken[] = [
    ...BASE_PRIVATE_SOLID_VARIABLES,
    '70-solid',
    '20-solid',
];

export const LIGHT__BLACK_PRIVATE_SOLID_VARIABLES: PrivateSolidColorToken[] =
    BASE_PRIVATE_SOLID_VARIABLES.filter((v) => v !== '1000-solid');

export const LIGHT__BLACK_PRIVATE_VARIABLES: PrivateColorToken[] = [
    '950',
    '900',
    '850',
    '800',
    '750',
    '700',
    '650',
    '600',
    ...BASE_PRIVATE_VARIABLES,
];

export const DARK__BLACK_PRIVATE_VARIABLES: PrivateColorToken[] = [
    ...LIGHT__BLACK_PRIVATE_VARIABLES,
    '20',
];

export const COLORS_MAP = {
    50: {a: 0.1, c: -1},
    100: {a: 0.15, c: -1},
    150: {a: 0.2, c: -1},
    200: {a: 0.3, c: -1},
    250: {a: 0.4, c: -1},
    300: {a: 0.5, c: -1},
    350: {a: 0.6, c: -1},
    400: {a: 0.7, c: -1},
    450: {a: 0.8, c: -1},
    500: {a: 0.9, c: -1},
    550: {a: 1, c: 1},
    600: {a: 0.9, c: 1},
    650: {a: 0.8, c: 1},
    700: {a: 0.7, c: 1},
    750: {a: 0.6, c: 1},
    800: {a: 0.5, c: 1},
    850: {a: 0.4, c: 1},
    900: {a: 0.3, c: 1},
    950: {a: 0.2, c: 1},
    1000: {a: 0.15, c: 1},
};

export const THEME_PRESET = {
    light: {
        white: {
            privateSolidVariables: [],
            privateVariables: LIGHT__WHITE_PRIVATE_VARIABLES,
            colorsMap: {
                50: {a: 0.05, c: 1},
                70: {a: 0.07, c: 1},
                100: {a: 0.1, c: 1},
                150: {a: 0.15, c: 1},
                200: {a: 0.2, c: 1},
                250: {a: 0.25, c: 1},
                300: {a: 0.3, c: 1},
                350: {a: 0.35, c: 1},
                400: {a: 0.4, c: 1},
                450: {a: 0.45, c: 1},
                500: {a: 0.5, c: 1},
                550: {a: 0.55, c: 1},
                600: {a: 0.6, c: 1},
                650: {a: 0.65, c: 1},
                700: {a: 0.7, c: 1},
                750: {a: 0.75, c: 1},
                800: {a: 0.8, c: 1},
                850: {a: 0.85, c: 1},
                900: {a: 0.9, c: 1},
                950: {a: 0.95, c: 1},
                1000: {a: 1, c: 1},
            },
        },
        black: {
            privateSolidVariables: LIGHT__BLACK_PRIVATE_SOLID_VARIABLES,
            privateVariables: LIGHT__BLACK_PRIVATE_VARIABLES,
            colorsMap: {
                50: {a: 0.05, c: -1},
                70: {a: 0.07, c: -1},
                100: {a: 0.1, c: -1},
                150: {a: 0.15, c: -1},
                200: {a: 0.2, c: -1},
                250: {a: 0.25, c: -1},
                300: {a: 0.3, c: -1},
                350: {a: 0.35, c: -1},
                400: {a: 0.4, c: -1},
                450: {a: 0.45, c: -1},
                500: {a: 0.5, c: -1},
                550: {a: 0.55, c: -1},
                600: {a: 0.6, c: -1},
                650: {a: 0.65, c: -1},
                700: {a: 0.7, c: -1},
                750: {a: 0.75, c: -1},
                800: {a: 0.8, c: -1},
                850: {a: 0.85, c: -1},
                900: {a: 0.9, c: -1},
                950: {a: 0.95, c: -1},
                1000: {a: 1, c: -1},
            },
        },
    },
    dark: {
        white: {
            privateSolidVariables: DARK__WHITE_PRIVATE_SOLID_VARIABLES,
            privateVariables: DARK__WHITE_PRIVATE_VARIABLES,
            colorsMap: {
                20: {a: 0.02, c: -1},
                50: {a: 0.05, c: -1},
                70: {a: 0.07, c: -1},
                100: {a: 0.1, c: -1},
                150: {a: 0.15, c: -1},
                200: {a: 0.2, c: -1},
                250: {a: 0.25, c: -1},
                300: {a: 0.3, c: -1},
                350: {a: 0.35, c: -1},
                400: {a: 0.4, c: -1},
                450: {a: 0.45, c: -1},
                500: {a: 0.5, c: -1},
                550: {a: 0.55, c: -1},
                600: {a: 0.6, c: -1},
                650: {a: 0.65, c: -1},
                700: {a: 0.7, c: -1},
                750: {a: 0.75, c: -1},
                800: {a: 0.8, c: -1},
                850: {a: 0.85, c: -1},
                900: {a: 0.9, c: -1},
                950: {a: 0.95, c: -1},
                1000: {a: 1, c: -1},
            },
        },
        black: {
            privateSolidVariables: [],
            privateVariables: DARK__BLACK_PRIVATE_VARIABLES,
            colorsMap: {
                20: {a: 0.02, c: 1},
                50: {a: 0.05, c: 1},
                100: {a: 0.1, c: 1},
                150: {a: 0.15, c: 1},
                200: {a: 0.2, c: 1},
                250: {a: 0.25, c: 1},
                300: {a: 0.3, c: 1},
                350: {a: 0.35, c: 1},
                400: {a: 0.4, c: 1},
                450: {a: 0.45, c: 1},
                500: {a: 0.5, c: 1},
                550: {a: 0.55, c: 1},
                600: {a: 0.6, c: 1},
                650: {a: 0.65, c: 1},
                700: {a: 0.7, c: 1},
                750: {a: 0.75, c: 1},
                800: {a: 0.8, c: 1},
                850: {a: 0.85, c: 1},
                900: {a: 0.9, c: 1},
                950: {a: 0.95, c: 1},
                1000: {a: 1, c: 1},
            },
        },
    },
};
