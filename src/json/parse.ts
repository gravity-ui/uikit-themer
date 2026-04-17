import {cloneDeep} from 'lodash-es';
import {DEFAULT_THEME} from '../constants.js';
import {type GravityTheme} from '../types.js';
import {
    isIllustrationColorCssVariable,
    getIllustrationColorTypeFromCssVariable,
} from '../libraries/illustrations/utils.js';
import {
    createInternalColorReference,
    getUtilityColorTypeFromCssVariable,
    isColorCssVariable,
    isPrivateColorCssVariable,
    isUtilityColorCssVariable,
    parsePrivateColorCssVariable,
    restoreBaseColorsFromPrivateColors,
    replaceReferencesInUtilityColors,
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

    for (const themeType of ['light', 'dark'] as const) {
        const value = parameters[themeType].value;
        let ref: string | undefined = parameters[themeType].ref;

        if (ref) {
            const internalColorReference = createInternalColorReference(ref);
            if (internalColorReference) {
                ref = internalColorReference;
            }
        }

        theme.utilityColors[utilityColorType][themeType] = {value, ref};
    }
};

const applyIllustrationColorVariable = (
    theme: GravityTheme,
    cssVariable: string,
    parameters: ThemizedValueWithReference,
) => {
    const illustrationColorType = getIllustrationColorTypeFromCssVariable(cssVariable);

    if (!illustrationColorType) {
        console.error(`Error when parse illustration variable ${cssVariable}`);
        return;
    }

    if (!theme.libraries?.illustrations) {
        return;
    }

    theme.libraries.illustrations[illustrationColorType].light = parameters.light;
    theme.libraries.illustrations[illustrationColorType].dark = parameters.dark;
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
        // TODO parse ref for font family
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
Input object format: {
    '--g-color-brand-heavy': {
        dark: { value: '', ref: '' }
        light: { value: '', ref: '' }
    },
    '--g-color-text-base': {
        dark: { value: '', ref: '' }
        light: { value: '', ref: '' }
    },
}
*/
/**
 * Parses a JSON theme into a GravityTheme object.
 * @param input - The JSON theme to parse
 * @returns Parsed GravityTheme object
 */
export function parseJSON(input: JsonTheme): GravityTheme {
    const theme = cloneDeep(DEFAULT_THEME);

    for (const [variable, parameters] of Object.entries(input)) {
        if (isIllustrationColorCssVariable(variable)) {
            if (!isThemizedValueWithReference(parameters)) {
                console.error(`Incorrect options format for variable ${variable}. Skip`);
                continue;
            }

            applyIllustrationColorVariable(theme, variable, parameters);
        } else if (isColorCssVariable(variable)) {
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

    theme.utilityColors = replaceReferencesInUtilityColors(
        theme.utilityColors,
        theme.privateColors,
    );

    theme.baseColors = restoreBaseColorsFromPrivateColors(theme.baseColors, theme.privateColors);

    return theme;
}
