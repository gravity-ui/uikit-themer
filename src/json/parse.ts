import {cloneDeep} from 'lodash-es';
import {DEFAULT_THEME} from '../constants.js';
import {type GravityTheme} from '../types.js';
import {
    getUtilityColorTypeFromCssVariable,
    isColorCssVariable,
    isPrivateColorCssVariable,
    isUtilityColorCssVariable,
    parsePrivateColorCssVariable,
    restoreBaseColorsFromPrivateColors,
} from '../utils.js';
import {
    getKeyFromCssFontVariable,
    isFontCssVariable,
    isTextCssVariable,
    parseCssFontFamily,
    parseTextCssVariable,
} from '../typography/utils.js';
import {
    type JsonTheme,
    isThemizedValueWithReference,
    isValueWithReference,
    type ThemizedValueWithReference,
    type ValueWithReference,
} from './types.js';
import {getSizeFromCssBorderSizeVariable, isBorderRadiusCssVariable} from '../borders/utils.js';

const applyPrivateColorVariable = (
    theme: GravityTheme,
    cssVariable: string,
    parameters: ThemizedValueWithReference,
) => {
    try {
        const {mainColorToken, privateColorToken} = parsePrivateColorCssVariable(cssVariable);

        if (!theme.baseColors[mainColorToken]) {
            theme.baseColors[mainColorToken] = {
                light: {
                    value: '',
                },
                dark: {
                    value: '',
                },
            };
        }

        if (!theme.privateColors[mainColorToken]) {
            theme.privateColors[mainColorToken] = {
                light: {},
                dark: {},
            };
        }

        theme.privateColors[mainColorToken].light[privateColorToken] = parameters.light;
        theme.privateColors[mainColorToken].dark[privateColorToken] = parameters.dark;
    } catch (error) {
        console.error(error);
        return;
    }
};

const applyUtilityColorVariable = (
    theme: GravityTheme,
    cssVariable: string,
    parameters: ThemizedValueWithReference,
) => {
    const utilityColorType = getUtilityColorTypeFromCssVariable(cssVariable);

    if (!utilityColorType) {
        console.error(`Error when parse utility variable ${cssVariable}`);
        return;
    }

    theme.utilityColors[utilityColorType].light = parameters.light;
    theme.utilityColors[utilityColorType].dark = parameters.dark;
};

const applyFontVariable = (
    theme: GravityTheme,
    cssVariable: string,
    parameters: ValueWithReference,
) => {
    const key = getKeyFromCssFontVariable(cssVariable);
    const fontFamilyParams = parseCssFontFamily(parameters.value);

    if (!fontFamilyParams) {
        console.error(`Error when parse font family variable ${cssVariable}`);
        return;
    }

    theme.typography.fontFamilies[key] = fontFamilyParams;
};

const applyTextVariable = (
    theme: GravityTheme,
    cssVariable: string,
    parameters: ValueWithReference,
) => {
    const parseResult = parseTextCssVariable(cssVariable);

    if (!parseResult) {
        console.error(`Error when parse text variable ${cssVariable}`);
        return;
    }

    if ('variant' in parseResult) {
        const {property, variant} = parseResult;
        theme.typography.variants[variant][property] = parameters.value;
    } else {
        const {property, group} = parseResult;
        // TODO парсить ref для font family
        theme.typography.groups[group][property] = parameters.value;
    }
};

const applyBorderRadiusVariable = (
    theme: GravityTheme,
    cssVariable: string,
    parameters: ValueWithReference,
) => {
    const size = getSizeFromCssBorderSizeVariable(cssVariable);

    if (!size) {
        console.error(`Error when parse border radius variable ${cssVariable}`);
        return;
    }

    theme.borders[size] = parameters.value;
};

/*
На входе объект вида: {
    ‘-—g-color-brand-heavy’: {
        dark: { value: ‘’, ref: '' }
        light: { value: ‘’, ref: '' }
    },
    ‘—-g-color-text-base’: {
        dark: { value: ‘’, ref: '' }
        light: { value: ‘’, ref: '' }
    },
}
*/
export function parseJSON(input: JsonTheme): GravityTheme {
    const theme = cloneDeep(DEFAULT_THEME);

    for (const [variable, parameters] of Object.entries(input)) {
        if (isColorCssVariable(variable)) {
            if (!isThemizedValueWithReference(parameters)) {
                console.error(`Incorrect options format for variable ${variable}. Skip`);
                continue;
            }

            if (isPrivateColorCssVariable(variable)) {
                applyPrivateColorVariable(theme, variable, parameters);
            } else if (isUtilityColorCssVariable(variable)) {
                applyUtilityColorVariable(theme, variable, parameters);
            } else {
                console.error(`Unsupported color css variable ${variable}. Skip`);
            }
        } else if (isFontCssVariable(variable)) {
            if (isValueWithReference(parameters)) {
                applyFontVariable(theme, variable, parameters);
            } else {
                console.error(`Incorrect options format for variable ${variable}. Skip`);
            }
        } else if (isTextCssVariable(variable)) {
            if (isValueWithReference(parameters)) {
                applyTextVariable(theme, variable, parameters);
            } else {
                console.error(`Incorrect options format for variable ${variable}. Skip`);
            }
        } else if (isBorderRadiusCssVariable(variable)) {
            if (isValueWithReference(parameters)) {
                applyBorderRadiusVariable(theme, variable, parameters);
            } else {
                console.error(`Incorrect options format for variable ${variable}. Skip`);
            }
        } else {
            console.error(`Unsupported css variable ${variable}. Skip`);
        }
    }

    theme.baseColors = restoreBaseColorsFromPrivateColors(theme.baseColors, theme.privateColors);

    return theme;
}
