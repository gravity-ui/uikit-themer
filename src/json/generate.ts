import type {BorderSize} from '../borders/types.js';
import {createBorderRadiusCssVariable} from '../borders/utils.js';
import type {AnyPrivateColorToken} from '../private-colors/types.js';
import type {GravityTheme, UtilityColor} from '../types.js';
import {
    TEXT_GROUP_PROPERTIES,
    TEXT_GROUPS,
    TEXT_VARIANT_PROPERTIES,
    type TextGroup,
    type TextVariant,
} from '../typography/types.js';
import {
    createFontCssVariable,
    createTextCssVariable,
    generateCssFontFamily,
} from '../typography/utils.js';
import {createPrivateColorCssVariable, createUtilityColorCssVariable} from '../utils.js';
import {isValueWithReference, type JsonTheme, type ThemizedValueWithReference} from './types.js';

/*
На выходе объект вида: {
    ‘-—g-color-brand-heavy’: {
        dark: { value: ‘’ }
        light: { value: ‘’ }
    },
    ‘—-g-color-text-base’: {
        dark: { value: ‘’ }
        light: { value: ‘’ }
    },
}
*/
export function generateJSON(theme: GravityTheme): JsonTheme {
    const result: JsonTheme = {};

    for (const [key, value] of Object.entries(theme.typography.fontFamilies)) {
        const cssVariable = createFontCssVariable(key);
        result[cssVariable] = {value: generateCssFontFamily(value)};
    }

    for (const [group, value] of Object.entries(theme.typography.groups)) {
        for (const property of TEXT_GROUP_PROPERTIES) {
            const cssVariable = createTextCssVariable({
                group: group as TextGroup,
                property,
            });
            if (property === 'font-family') {
                const val = value[property];
                const refCssVariable = createFontCssVariable(val);
                const clearValue = result[refCssVariable];

                result[cssVariable] = {
                    value: isValueWithReference(clearValue) ? clearValue.value : val,
                    ref: refCssVariable,
                };
            } else {
                result[cssVariable] = {value: value[property].toString()};
            }
        }
    }

    for (const group of TEXT_GROUPS) {
        for (const [variant, value] of Object.entries(theme.typography.variants)) {
            for (const property of TEXT_VARIANT_PROPERTIES) {
                const cssVariable = createTextCssVariable({
                    group: group as TextGroup,
                    property,
                    variant: variant as TextVariant,
                });
                result[cssVariable] = {value: value[property]};
            }
        }
    }

    for (const [colorToken, themizedPrivateColors] of Object.entries(theme.privateColors)) {
        for (const theme of ['light', 'dark'] as const) {
            for (const [privateColorToken, value] of Object.entries(themizedPrivateColors[theme])) {
                const cssVariable = createPrivateColorCssVariable(
                    colorToken,
                    privateColorToken as AnyPrivateColorToken,
                );

                if (!result[cssVariable]) {
                    result[cssVariable] = {
                        light: {value: ''},
                        dark: {value: ''},
                    };
                }

                (result[cssVariable] as ThemizedValueWithReference)[theme] = value;
            }
        }
    }

    for (const [colorToken, value] of Object.entries(theme.utilityColors)) {
        const cssVariable = createUtilityColorCssVariable(colorToken as UtilityColor);
        result[cssVariable] = value;
    }

    for (const [size, value] of Object.entries(theme.borders)) {
        const cssVariable = createBorderRadiusCssVariable(size as BorderSize);
        result[cssVariable] = {
            value,
        };
    }

    return result;
}
