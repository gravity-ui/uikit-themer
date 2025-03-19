import {THEME_BORDER_RADIUS_VARIABLE_PREFIX} from '../variables.js';
import {BORDER_SIZES, type BorderSize} from './types.js';

/**
 * Проверяет принадлежность CSS-переменной к радиусам границ.
 *
 * @example
 * isBorderRadiusCssVariable('--g-border-radius-xs') === true
 * isBorderRadiusCssVariable('--g-color-text-link-visited') === false
 *
 * @param variable string
 * @returns boolean
 */
export function isBorderRadiusCssVariable(variable: string) {
    return variable.startsWith(THEME_BORDER_RADIUS_VARIABLE_PREFIX);
}

export function createBorderRadiusCssVariable(borderSize: BorderSize) {
    return `${THEME_BORDER_RADIUS_VARIABLE_PREFIX}-${borderSize}`;
}

/**
 * Извлекает размер из CSS-переменной для скруглений.
 *
 * @example
 * getSizeFromCssBorderSizeVariable('--g-border-radius-xs') === 'xs'
 * getSizeFromCssBorderSizeVariable('--g-border-radius-xl') === 'xl'
 *
 * @param variable string
 * @returns string
 */
export function getSizeFromCssBorderSizeVariable(variable: string) {
    const size = variable.replace(`${THEME_BORDER_RADIUS_VARIABLE_PREFIX}-`, '');
    if (BORDER_SIZES.includes(size as BorderSize)) {
        return size as BorderSize;
    }

    return undefined;
}
