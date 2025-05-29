import {THEME_BORDER_RADIUS_VARIABLE_PREFIX} from '../variables.js';
import {BORDER_SIZES, type BorderSize} from './types.js';

/**
 * Checks if a CSS variable is a border radius variable.
 *
 * @example
 * isBorderRadiusCssVariable('--g-border-radius-xs') === true
 * isBorderRadiusCssVariable('--g-color-text-link-visited') === false
 *
 * @param variable - The CSS variable to check
 * @returns True if the variable is a border radius CSS variable
 */
export function isBorderRadiusCssVariable(variable: string) {
    return variable.startsWith(THEME_BORDER_RADIUS_VARIABLE_PREFIX);
}

/**
 * Creates a border radius CSS variable from a border size.
 * @param borderSize - The border size
 * @returns CSS variable string
 */
export function createBorderRadiusCssVariable(borderSize: BorderSize) {
    return `${THEME_BORDER_RADIUS_VARIABLE_PREFIX}-${borderSize}`;
}

/**
 * Extracts the size from a CSS border size variable.
 *
 * @example
 * getSizeFromCssBorderSizeVariable('--g-border-radius-xs') === 'xs'
 * getSizeFromCssBorderSizeVariable('--g-border-radius-xl') === 'xl'
 *
 * @param variable - The CSS variable to parse
 * @returns The extracted border size or undefined if invalid
 */
export function getSizeFromCssBorderSizeVariable(variable: string) {
    if (!isBorderRadiusCssVariable(variable)) {
        return undefined;
    }

    const size = variable.replace(`${THEME_BORDER_RADIUS_VARIABLE_PREFIX}-`, '');

    return BORDER_SIZES.includes(size as BorderSize) ? (size as BorderSize) : undefined;
}
