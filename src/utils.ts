import {THEME_COLOR_VARIABLE_PREFIX, THEME_PRIVATE_COLOR_VARIABLE_PREFIX} from './variables.js';
import type {AnyPrivateColorToken} from './private-colors/types.js';
import {ALL_PRIVATE_VARIABLES} from './private-colors/constants.js';
import {
    UTILITY_COLORS,
    type BaseColors,
    type GravityTheme,
    type PrivateColorOptions,
    type PrivateColors,
    type Theme,
    type UtilityColor,
    type UtilityColors,
} from './types.js';
import {cloneDeep} from 'lodash-es';
import {generatePrivateColors} from './private-colors/generatePrivateColors.js';

/**
 * Creates an internal reference to a private color.
 * @param mainColorToken - The main color token name
 * @param privateColorToken - The private color token
 * @returns Internal private color reference string (example: private.brand.200-solid)
 */
export function createInternalPrivateColorReference(
    mainColorToken: string,
    privateColorToken: string,
) {
    return `private.${mainColorToken}.${privateColorToken}`;
}

/**
 * Checks if a string is an internal private color reference.
 * @param privateColorReference - The reference string to check
 * @returns True if the string is a valid internal private color reference
 */
export function isInternalPrivateColorReference(privateColorReference?: string) {
    if (!privateColorReference) {
        return false;
    }

    const parts = privateColorReference.split('.');

    if (parts.length !== 3 || parts[0] !== 'private') {
        return false;
    }

    return true;
}

/**
 * Parses an internal private color reference into its components.
 * @param privateColorReference - The internal private color reference string
 * @returns Parsed components or undefined if invalid
 * @example
 * parseInternalPrivateColorReference('private.brand.200-solid') === {
 *      "mainColorToken": "brand",
 *      "privateColorCode": "200-solid"
 * }
 */
export function parseInternalPrivateColorReference(privateColorReference: string) {
    const parts = privateColorReference.split('.');

    if (parts.length !== 3 || parts[0] !== 'private') {
        return undefined;
    }

    const mainColorToken = parts[1] as string;
    const privateColorCode = parts[2] as string;

    if (isPrivateColorToken(privateColorCode)) {
        return {
            mainColorToken,
            privateColorCode,
        };
    }

    return undefined;
}

/**
 * Checks if a CSS variable belongs to color variables.
 *
 * @example
 * isColorCssVariable('--g-color-text-link-visited') === true
 * isColorCssVariable('--g-color-private-brand-200') === true
 * isColorCssVariable('--g-spacing-0') === false
 *
 * @param variable - CSS variable name
 * @returns True if the variable is a color CSS variable
 */
export function isColorCssVariable(variable: string) {
    return variable.startsWith(THEME_COLOR_VARIABLE_PREFIX);
}

/**
 * Checks if a CSS variable belongs to private color variables.
 *
 * @example
 * isPrivateColorCssVariable('--g-color-private-brand-200') === true
 * isPrivateColorCssVariable('--g-color-text-link-visited') === false
 *
 * @param variable - CSS variable name
 * @returns True if the variable is a private color CSS variable
 */
export function isPrivateColorCssVariable(variable: string) {
    return variable.startsWith(THEME_PRIVATE_COLOR_VARIABLE_PREFIX);
}

/**
 * Creates a private CSS variable.
 *
 * @example
 * createPrivateColorCssVariable('brand', '200-solid') === '--g-color-private-brand-200-solid'
 * createPrivateColorCssVariable('white', '100') === '--g-color-private-white-100'
 *
 * @param mainColorToken - Main color token name
 * @param privateColorToken - Private color token
 * @returns CSS variable string
 */
export function createPrivateColorCssVariable(
    mainColorToken: string,
    privateColorToken: AnyPrivateColorToken,
) {
    return `${THEME_PRIVATE_COLOR_VARIABLE_PREFIX}-${mainColorToken}-${privateColorToken}`;
}

const PRIVATE_COLOR_TOKENS = new Set(ALL_PRIVATE_VARIABLES);

/**
 * Checks if a token is a valid private color token.
 * @param token - Token to check
 * @returns True if the token is a valid private color token
 */
function isPrivateColorToken(token: string): token is AnyPrivateColorToken {
    return PRIVATE_COLOR_TOKENS.has(token as AnyPrivateColorToken);
}

/**
 * Extracts color name and private token from a private color CSS variable.
 *
 * @example
 * parsePrivateColorCssVariable('--g-color-private-brand-200-solid') === {
 *      "mainColorToken": "brand",
 *      "privateColorToken": "200-solid"
 * }
 *
 * @param variable - CSS variable string
 * @returns Parsed color components
 */
export function parsePrivateColorCssVariable(variable: string) {
    if (!variable.startsWith(THEME_PRIVATE_COLOR_VARIABLE_PREFIX)) {
        throw new Error('Invalid private color CSS variable prefix');
    }

    const suffix = variable.slice(THEME_PRIVATE_COLOR_VARIABLE_PREFIX.length + 1);

    const parts = suffix.split('-');

    let bestMatchIndex = -1;
    let bestMatchToken = '';

    for (let i = 0; i < parts.length; i++) {
        const candidate = parts.slice(i).join('-');

        if (isPrivateColorToken(candidate) && candidate.length > bestMatchToken.length) {
            bestMatchToken = candidate;
            bestMatchIndex = i;
        }
    }

    if (bestMatchIndex === -1) {
        throw new Error('Invalid CSS variable format');
    }

    return {
        mainColorToken: parts.slice(0, bestMatchIndex).join('-'),
        privateColorToken: bestMatchToken as AnyPrivateColorToken,
    };
}

/**
 * Creates a CSS variable for utility color.
 *
 * @example
 * createUtilityColorCssVariable('base-brand-hover') === '--g-color-base-brand-hover'
 *
 * @param colorName - Utility color name
 * @returns CSS variable string
 */
export function createUtilityColorCssVariable(colorName: UtilityColor) {
    return `${THEME_COLOR_VARIABLE_PREFIX}-${colorName}`;
}

const UTILITY_COLOR_CSS_VARIABLES = new Set(UTILITY_COLORS.map(createUtilityColorCssVariable));

/**
 * Checks if a CSS variable is a utility color variable.
 *
 * @example
 * isUtilityColorCssVariable('--g-color-base-brand-hover') === true
 *
 * @param variable - CSS variable to check
 * @returns True if the variable is a utility color CSS variable
 */
export function isUtilityColorCssVariable(variable: string) {
    return UTILITY_COLOR_CSS_VARIABLES.has(variable);
}

/**
 * Extracts utility color type from a CSS variable.
 *
 * @example
 * getUtilityColorTypeFromCssVariable('--g-color-base-brand-hover') === 'base-brand-hover'
 *
 * @param variable - CSS variable string
 * @returns Utility color type or undefined if invalid
 */
export function getUtilityColorTypeFromCssVariable(variable: string): UtilityColor | undefined {
    return isUtilityColorCssVariable(variable)
        ? (variable.split(`${THEME_COLOR_VARIABLE_PREFIX}-`)[1] as UtilityColor)
        : undefined;
}

/**
 * Creates an internal reference to a utility color.
 * @param utilityColor - The utility color name
 * @returns Internal utility color reference string (example: utility.base-brand-hover)
 */
export function createInternalUtilityColorReference(utilityColor: UtilityColor) {
    return `utility.${utilityColor}`;
}

const UTILITY_COLOR_TOKENS = new Set(UTILITY_COLORS);

/**
 * Checks if a string is a valid utility color token.
 * @param token - The token to check
 * @returns True if the token is a valid utility color token
 */
export function isUtilityColorToken(token: string): token is UtilityColor {
    return UTILITY_COLOR_TOKENS.has(token as UtilityColor);
}

/**
 * Checks if a string is an internal utility color reference.
 * @param utilityColorReference - The reference string to check
 * @returns True if the string is a valid internal utility color reference
 */
export function isInternalUtilityColorReference(utilityColorReference?: string) {
    if (!utilityColorReference) {
        return false;
    }

    const parts = utilityColorReference.split('.');

    if (parts.length !== 2 || parts[0] !== 'utility') {
        return false;
    }

    return true;
}

/**
 * Parses an internal utility color reference into its utility color.
 * @param utilityColorReference - The internal utility color reference string
 * @returns Parsed utility color or undefined if invalid
 * @example
 * parseInternalUtilityColorReference('utility.base-brand-hover') === 'base-brand-hover'
 * parseInternalUtilityColorReference('utility.wrong-utility-color') === undefined
 */
export function parseInternalUtilityColorReference(utilityColorReference: string) {
    const parts = utilityColorReference.split('.');

    if (parts.length !== 2 || parts[0] !== 'utility') {
        return undefined;
    }

    if (isUtilityColorToken(parts[1] as UtilityColor)) {
        return parts[1] as UtilityColor;
    }

    return undefined;
}

/**
 * Replaces internal references in utility colors with actual values from private colors.
 * @param utilityColors - Utility colors with potential internal references
 * @param privateColors - Private colors to resolve references against
 * @returns Utility colors with resolved references
 */
export const replaceReferencesInUtilityColors = (
    utilityColors: UtilityColors,
    privateColors: PrivateColors,
): UtilityColors => {
    const result = cloneDeep(utilityColors);

    // First, process all private color references
    for (const [colorToken, colorValues] of Object.entries(result)) {
        for (const [theme, colorValue] of Object.entries(colorValues)) {
            if (isInternalPrivateColorReference(colorValue.value)) {
                let newValue = '';
                let ref: string | undefined;

                const parseResult = parseInternalPrivateColorReference(colorValue.value);

                if (parseResult) {
                    const {mainColorToken, privateColorCode} = parseResult;
                    newValue =
                        privateColors[mainColorToken]?.[theme as Theme][privateColorCode]?.value ||
                        '';
                    ref = colorValue.value;
                }

                result[colorToken as UtilityColor][theme as Theme] = {
                    value: newValue,
                    ref,
                };
            }
        }
    }

    // Now process all utility color references
    for (const [colorToken, colorValues] of Object.entries(result)) {
        for (const [theme, colorValue] of Object.entries(colorValues)) {
            if (isInternalUtilityColorReference(colorValue.value)) {
                let newValue = '';
                let ref: string | undefined;

                const refUtilityColor = parseInternalUtilityColorReference(colorValue.value);

                if (refUtilityColor) {
                    newValue = result[refUtilityColor][theme as Theme].value;

                    if (
                        isInternalPrivateColorReference(newValue) ||
                        isInternalUtilityColorReference(newValue)
                    ) {
                        throw new Error(
                            `Circular reference detected in utility color ${colorToken}`,
                        );
                    }

                    ref = colorValue.value;
                }

                result[colorToken as UtilityColor][theme as Theme] = {
                    value: newValue,
                    ref,
                };
            }
        }
    }

    return result;
};

/**
 * Restores base colors from private colors by extracting base values.
 * @param initialBaseColors - Initial base colors structure
 * @param privateColors - Private colors to extract base values from
 * @returns Restored base colors
 */
export const restoreBaseColorsFromPrivateColors = (
    initialBaseColors: BaseColors,
    privateColors: PrivateColors,
): BaseColors => {
    const baseColors: BaseColors = cloneDeep(initialBaseColors);

    for (const [colorToken, values] of Object.entries(privateColors)) {
        for (const theme of ['light', 'dark'] as const) {
            const baseColorOptions =
                colorToken === 'white' || colorToken === 'black'
                    ? values[theme]['1000-solid']
                    : values[theme]['550-solid'];

            if (!baseColors[colorToken]) {
                baseColors[colorToken] = {
                    light: {value: ''},
                    dark: {value: ''},
                };
            }

            baseColors[colorToken][theme] = {
                value: baseColorOptions?.value || '',
            };
        }
    }

    return baseColors;
};

/**
 * Generates private colors for all base colors.
 * @param baseColors - Base colors to generate private colors for
 * @param lightBackgroundColor - Light theme background color
 * @param darkBackgroundColor - Dark theme background color
 * @returns Generated private colors
 */
export const generatePrivateColorsForBaseColors = (
    baseColors: BaseColors,
    lightBackgroundColor: string,
    darkBackgroundColor: string,
): PrivateColors => {
    const privateColors: PrivateColors = {};

    for (const [colorToken, colorValues] of Object.entries(baseColors)) {
        if (!privateColors[colorToken]) {
            privateColors[colorToken] = {
                dark: {},
                light: {},
            };
        }

        for (const [theme, colorValue] of Object.entries(colorValues)) {
            const generatedColors = generatePrivateColors({
                theme: theme as Theme,
                colorToken,
                colorValue: colorValue.value,
                lightBg: lightBackgroundColor,
                darkBg: darkBackgroundColor,
            });

            privateColors[colorToken][theme as Theme] = Object.entries(
                generatedColors,
            ).reduce<PrivateColorOptions>(
                (acc, [privateColorToken, value]) => ({
                    ...acc,
                    [privateColorToken as AnyPrivateColorToken]: {
                        value,
                    },
                }),
                {},
            );
        }
    }

    return privateColors;
};

type UpdateBaseColorOptions = {
    theme: GravityTheme;
    colorToken: string;
} & (
    | {
          themeVariant: Theme;
          value: string;
      }
    | {
          value: Record<Theme, string>;
      }
);

/**
 * Updates a base color in the theme with regeneration of private colors.
 *
 * @example
 * updateBaseColor({
 *      theme: theme,
 *      colorToken: 'brand',
 *      themeVariant: 'light',
 *      value: '#000000',
 * })
 *
 * updateBaseColor({
 *      theme: theme,
 *      colorToken: 'brand',
 *      value: {
 *          light: '#000000',
 *          dark: '#000000',
 *      },
 * })
 * @param options - The options for updating the base color
 * @param options.theme - The theme to update
 * @param options.themeVariant - The theme variant to update
 * @param options.colorToken - The color token to update
 * @param options.value - The new color value
 * @returns The updated theme
 */
export const updateBaseColor = (params: UpdateBaseColorOptions): GravityTheme => {
    const {theme, colorToken} = params;
    const newTheme = cloneDeep(theme);

    if (!newTheme.baseColors[colorToken]) {
        newTheme.baseColors[colorToken] = {
            light: {value: ''},
            dark: {value: ''},
        };
    }

    if ('themeVariant' in params) {
        const {themeVariant, value} = params;
        newTheme.baseColors[colorToken][themeVariant] = {
            value,
        };
    } else {
        const {value} = params;
        newTheme.baseColors[colorToken] = {
            light: {value: value.light},
            dark: {value: value.dark},
        };
    }

    if (!newTheme.privateColors[colorToken]) {
        newTheme.privateColors[colorToken] = {
            light: {},
            dark: {},
        };
    }

    if ('themeVariant' in params) {
        const {themeVariant, value} = params;

        const privateColors = generatePrivateColors({
            theme: themeVariant,
            colorToken,
            colorValue: value,
            lightBg: newTheme.utilityColors['base-background'].light.value,
            darkBg: newTheme.utilityColors['base-background'].dark.value,
        });

        newTheme.privateColors[colorToken][themeVariant] = Object.entries(
            privateColors,
        ).reduce<PrivateColorOptions>(
            (acc, [privateColorToken, value]) => ({
                ...acc,
                [privateColorToken as AnyPrivateColorToken]: {
                    value,
                },
            }),
            {},
        );
    } else {
        const {value} = params;

        const {light: lightPrivateColors, dark: darkPrivateColors} = (
            ['light', 'dark'] as const
        ).reduce<Record<Theme, PrivateColorOptions>>(
            (acc, theme) => {
                const privateColors = generatePrivateColors({
                    theme,
                    colorToken,
                    colorValue: value[theme],
                    lightBg: newTheme.utilityColors['base-background'].light.value,
                    darkBg: newTheme.utilityColors['base-background'].dark.value,
                });

                return {
                    ...acc,
                    [theme]: Object.entries(privateColors).reduce<PrivateColorOptions>(
                        (acc, [privateColorToken, value]) => ({
                            ...acc,
                            [privateColorToken as AnyPrivateColorToken]: {value},
                        }),
                        {},
                    ),
                };
            },
            {light: {}, dark: {}},
        );

        newTheme.privateColors[colorToken] = {
            light: lightPrivateColors,
            dark: darkPrivateColors,
        };
    }

    return newTheme;
};

/**
 * Removes a base color from the theme.
 *
 * @example
 * removeBaseColor({
 *      theme: theme,
 *      colorToken: 'brand',
 * })
 *
 * @param theme - The theme to remove the base color from
 * @param colorToken - The color token to remove
 * @returns The updated theme
 */
export const removeBaseColor = (theme: GravityTheme, colorToken: string): GravityTheme => {
    const newTheme = cloneDeep(theme);
    delete newTheme.baseColors[colorToken];
    delete newTheme.privateColors[colorToken];
    return newTheme;
};

type UpdateUtilityColorOptions = {
    theme: GravityTheme;
    themeVariant: Theme;
    colorToken: UtilityColor;
    value: string;
};

/**
 * Updates a utility color in the theme.
 * If the utility color is 'base-background', it will regenerate private colors for all base colors.
 *
 * @example
 * updateUtilityColor({
 *      theme: theme,
 *      themeVariant: 'light',
 *      colorToken: 'base-background',
 *      value: '#000000',
 * })
 */
export const updateUtilityColor = (params: UpdateUtilityColorOptions): GravityTheme => {
    const {theme, themeVariant, colorToken, value} = params;
    const newTheme = cloneDeep(theme);
    newTheme.utilityColors[colorToken][themeVariant] = {value};

    if (colorToken === 'base-background') {
        Object.entries(newTheme.baseColors).forEach(([colorToken, colorValues]) => {
            Object.entries(colorValues).forEach(([theme, colorValue]) => {
                const privateColors = generatePrivateColors({
                    theme: theme as Theme,
                    colorToken,
                    colorValue: colorValue.value,
                    lightBg: newTheme.utilityColors['base-background'].light.value,
                    darkBg: newTheme.utilityColors['base-background'].dark.value,
                });

                newTheme.privateColors[colorToken]![theme as Theme] = Object.entries(
                    privateColors,
                ).reduce<PrivateColorOptions>(
                    (acc, [privateColorToken, value]) => ({
                        ...acc,
                        [privateColorToken as AnyPrivateColorToken]: {value},
                    }),
                    {},
                );
            });
        });
    }

    return newTheme;
};

/**
 * Parses a CSS variable reference from a value string.
 * @param value - Value string that may contain a CSS variable reference
 * @returns The CSS variable name or undefined if not found
 */
export function parseCssReferenceVariable(value: string) {
    const VAR_REGEXP = /var\((.*)\)/;
    const match = value.match(VAR_REGEXP);
    if (match) {
        const refCssVariable = match[1] as string;
        return refCssVariable;
    }

    return undefined;
}
