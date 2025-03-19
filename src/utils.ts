import {THEME_COLOR_VARIABLE_PREFIX, THEME_PRIVATE_COLOR_VARIABLE_PREFIX} from './variables.js';
import type {AnyPrivateColorToken} from './private-colors/types.js';
import {ALL_PRIVATE_VARIABLES} from './private-colors/constants.js';
import {
    UTILITY_COLORS,
    type BaseColors,
    type PrivateColorOptions,
    type PrivateColors,
    type Theme,
    type UtilityColor,
    type UtilityColors,
} from './types.js';
import {cloneDeep} from 'lodash-es';
import {generatePrivateColors} from './private-colors/generatePrivateColors.js';

export function createInternalPrivateColorReference(
    mainColorToken: string,
    privateColorToken: string,
) {
    return `private.${mainColorToken}.${privateColorToken}`;
}

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
 * Проверяет принадлежность CSS-переменной к цветовым переменным.
 *
 * @example
 * isColorCssVariable('--g-color-text-link-visited') === true
 * isColorCssVariable('--g-color-private-brand-200') === true
 * isColorCssVariable('--g-spacing-0') === false
 *
 * @param variable string
 * @returns boolean
 */
export function isColorCssVariable(variable: string) {
    return variable.startsWith(THEME_COLOR_VARIABLE_PREFIX);
}

/**
 * Проверяет принадлежность CSS-переменной к приватным цветовым переменным.
 *
 * @example
 * isPrivateColorCssVariable('--g-color-private-brand-200') === true
 * isPrivateColorCssVariable('--g-color-text-link-visited') === false
 *
 * @param variable string
 * @returns boolean
 */
export function isPrivateColorCssVariable(variable: string) {
    return variable.startsWith(THEME_PRIVATE_COLOR_VARIABLE_PREFIX);
}

/**
 * Создаёт приватную CSS-переменную.
 *
 * @example
 * createPrivateColorCssVariable('brand', '200-solid') === '--g-color-private-brand-200-solid'
 * createPrivateColorCssVariable('white', '100') === '--g-color-private-white-100'
 *
 * @param mainColorToken string
 * @param privateColorToken AnyPrivateColorToken
 * @returns string
 */
export function createPrivateColorCssVariable(
    mainColorToken: string,
    privateColorToken: AnyPrivateColorToken,
) {
    return `${THEME_PRIVATE_COLOR_VARIABLE_PREFIX}-${mainColorToken}-${privateColorToken}`;
}

const PRIVATE_COLOR_TOKENS = new Set(ALL_PRIVATE_VARIABLES);

function isPrivateColorToken(token: string): token is AnyPrivateColorToken {
    return PRIVATE_COLOR_TOKENS.has(token as AnyPrivateColorToken);
}

/**
 * Извлекает название цвета и приватный токен из CSS-переменной приватного цвета.
 *
 * @example
 * parsePrivateColorCssVariable('--g-color-private-brand-200-solid') === {
 *      "mainColorToken": "brand",
 *      "privateColorToken": "200-solid"
 * }
 *
 * @param variable string
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
 * Создаёт приватную CSS-переменную для утилитарного цвета.
 *
 * @example
 * createUtilityColorCssVariable('base-brand-hover') === '--g-color-base-brand-hover'
 *
 * @param colorName UtilityColor
 * @returns string
 */
export function createUtilityColorCssVariable(colorName: UtilityColor) {
    return `${THEME_COLOR_VARIABLE_PREFIX}-${colorName}`;
}

const UTILITY_COLOR_CSS_VARIABLES = new Set(UTILITY_COLORS.map(createUtilityColorCssVariable));

export function isUtilityColorCssVariable(variable: string) {
    return UTILITY_COLOR_CSS_VARIABLES.has(variable);
}

/**
 * Извлекает тип утилитарного цвета из CSS-переменной.
 *
 * @example
 * getUtilityColorTypeFromCssVariable('--g-color-base-brand-hover') === 'base-brand-hover'
 *
 * @param variable string
 * @returns UtilityColor
 */
export function getUtilityColorTypeFromCssVariable(variable: string): UtilityColor | undefined {
    return isUtilityColorCssVariable(variable)
        ? (variable.split(`${THEME_COLOR_VARIABLE_PREFIX}-`)[1] as UtilityColor)
        : undefined;
}

export const replaceReferencesInUtilityColors = (
    utilityColors: UtilityColors,
    privateColors: PrivateColors,
): UtilityColors => {
    const result = cloneDeep(utilityColors);

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
                    ref = createPrivateColorCssVariable(mainColorToken, privateColorCode);
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

export const generatePrivateColorsForBaseColors = (
    baseColors: BaseColors,
    lightBackgroundColor: string,
    darkBackgroundColor: string,
): PrivateColors => {
    const privateColors: PrivateColors = {
        brand: {
            dark: {},
            light: {},
        },
    };

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

/**
 *
 * @param value
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
