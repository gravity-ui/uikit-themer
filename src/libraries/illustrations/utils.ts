import {cloneDeep} from 'lodash-es';
import {THEME_ILLUSTRATION_COLOR_VARIABLE_PREFIX} from '../../variables.js';
import {
    isInternalPrivateColorReference,
    parseInternalPrivateColorReference,
    isInternalUtilityColorReference,
    parseInternalUtilityColorReference,
} from '../../utils.js';
import type {PrivateColors, Theme, UtilityColors} from '../../types.js';
import {
    UTILITY_ILLUSTRATIONS_COLORS,
    type IllustrationColors,
    type UtilityIllustrationColor,
} from './types.js';

const UTILITY_ILLUSTRATION_COLOR_TOKENS = new Set(UTILITY_ILLUSTRATIONS_COLORS);

/**
 * Checks if a string is a valid utility illustration color token.
 * @param token - The token to check
 * @returns True if the token is a valid utility illustration color token
 */
export function isUtilityIllustrationColorToken(token: string): token is UtilityIllustrationColor {
    return UTILITY_ILLUSTRATION_COLOR_TOKENS.has(token as UtilityIllustrationColor);
}

/**
 * Checks if a string is an internal utility illustration color reference.
 * @param utilityIllustrationColorReference - The reference string to check
 * @returns True if the string is a valid internal utility color reference
 */
export function isInternalUtilityIllustrationColorReference(
    utilityIllustrationColorReference?: string,
) {
    if (!utilityIllustrationColorReference) {
        return false;
    }

    const parts = utilityIllustrationColorReference.split('.');

    if (parts.length !== 2 || parts[0] !== 'illustrations') {
        return false;
    }

    return true;
}

/**
 * Parses an internal utility illustration color reference into its utility color.
 * @param utilityIllustrationColorReference - The internal utility illustration color reference string
 * @returns Parsed utility color or undefined if invalid
 * @example
 * parseInternalUtilityIllustrationColorReference('illustrations.object-base') === 'object-base'
 * parseInternalUtilityIllustrationColorReference('illustrations.wrong-illustration-color') === undefined
 */
export function parseInternalUtilityIllustrationColorReference(
    utilityIllustrationColorReference: string,
) {
    const parts = utilityIllustrationColorReference.split('.');

    if (parts.length !== 2 || parts[0] !== 'illustrations') {
        return undefined;
    }

    if (isUtilityIllustrationColorToken(parts[1] as UtilityIllustrationColor)) {
        return parts[1] as UtilityIllustrationColor;
    }

    return undefined;
}

/**
 * Creates an internal reference to a utility illustration color.
 * @param utilityIllustrationColor - The utility illustration color name
 * @returns Internal utility illustration color reference string (example: illustrations.object-base)
 */
export function createInternalUtilityIllustrationColorReference(
    utilityIllustrationColor: UtilityIllustrationColor,
) {
    return `illustrations.${utilityIllustrationColor}`;
}

/**
 * Creates a CSS variable for illustration color.
 *
 * @example
 * createIllustrationColorCssVariable('object-base') === '--gil-color-object-base'
 *
 * @param colorName - Illustration color name
 * @returns CSS variable string
 */
export function createIllustrationColorCssVariable(colorName: UtilityIllustrationColor) {
    return `${THEME_ILLUSTRATION_COLOR_VARIABLE_PREFIX}-${colorName}`;
}

/**
 * Checks if a CSS variable belongs to illustration color variables.
 *
 * @example
 * isIllustrationColorCssVariable('--gil-color-object-base') === true
 * isIllustrationColorCssVariable('--g-color-text-link-visited') === false
 *
 * @param variable - CSS variable name
 * @returns True if the variable is an illustration color CSS variable
 */
export function isIllustrationColorCssVariable(variable: string) {
    return variable.startsWith(THEME_ILLUSTRATION_COLOR_VARIABLE_PREFIX);
}

/**
 * Extracts illustration color type from a CSS variable.
 *
 * @example
 * getIllustrationColorTypeFromCssVariable('--gil-color-object-base') === 'object-base'
 *
 * @param variable - CSS variable string
 * @returns Illustration color type or undefined if invalid
 */
export function getIllustrationColorTypeFromCssVariable(
    variable: string,
): UtilityIllustrationColor | undefined {
    if (!isIllustrationColorCssVariable(variable)) {
        return undefined;
    }

    const colorName = variable.split(`${THEME_ILLUSTRATION_COLOR_VARIABLE_PREFIX}-`)[1];

    if (colorName && isUtilityIllustrationColorToken(colorName)) {
        return colorName;
    }

    return undefined;
}

/**
 * Replaces internal references in illustration colors with actual values from private colors and utility colors.
 * @param illustrationColors - Illustration colors with potential internal references
 * @param privateColors - Private colors to resolve references against
 * @param utilityColors - Utility colors to resolve references against
 * @returns Illustration colors with resolved references
 */
export const replaceReferencesInIllustrationColors = (
    illustrationColors: IllustrationColors,
    privateColors: PrivateColors,
    utilityColors?: UtilityColors,
): IllustrationColors => {
    const result = cloneDeep(illustrationColors);

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

                result[colorToken as UtilityIllustrationColor][theme as Theme] = {
                    value: newValue,
                    ref,
                };
            } else if (isInternalUtilityColorReference(colorValue.value) && utilityColors) {
                let newValue = '';
                let ref: string | undefined;

                const refUtilityColor = parseInternalUtilityColorReference(colorValue.value);

                if (refUtilityColor) {
                    newValue = utilityColors[refUtilityColor][theme as Theme].value;

                    if (
                        isInternalPrivateColorReference(newValue) ||
                        isInternalUtilityColorReference(newValue)
                    ) {
                        throw new Error(
                            `Circular reference detected in illustration color ${colorToken}`,
                        );
                    }

                    ref = colorValue.value;
                }

                result[colorToken as UtilityIllustrationColor][theme as Theme] = {
                    value: newValue,
                    ref,
                };
            }
        }
    }

    return result;
};
