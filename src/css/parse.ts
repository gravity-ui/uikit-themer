import {cloneDeep} from 'lodash-es';
import {DEFAULT_THEME} from '../constants.js';
import type {GravityTheme, Theme} from '../types.js';
import {
    isPrivateColorCssVariable,
    isUtilityColorCssVariable,
    getUtilityColorTypeFromCssVariable,
    parsePrivateColorCssVariable,
    createInternalPrivateColorReference,
    replaceReferencesInUtilityColors,
    restoreBaseColorsFromPrivateColors,
    isColorCssVariable,
    parseCssReferenceVariable,
} from '../utils.js';
import {
    parseCssFontFamily,
    isFontCssVariable,
    isTextCssVariable,
    getKeyFromCssFontVariable,
    parseTextCssVariable,
} from '../typography/utils.js';
import {getSizeFromCssBorderSizeVariable, isBorderRadiusCssVariable} from '../borders/utils.js';

function parseThemeTokens(cssString: string) {
    const tokens: Record<Theme, Record<string, string>> = {
        light: {},
        dark: {},
    };

    const regex = /\.g-root_theme_(light|dark)\s*{([^}]*)}/g;

    let match;
    while ((match = regex.exec(cssString)) !== null) {
        const [_, themeName, properties] = match;

        if (themeName !== 'light' && themeName !== 'dark') {
            continue;
        }

        if (!properties) {
            continue;
        }

        const propRegex = /(--[\w-]+):\s*([^;]+);/g;
        let propMatch;
        while ((propMatch = propRegex.exec(properties)) !== null) {
            const [__, propName, propValue] = propMatch;
            if (!propName || !propValue) {
                continue;
            }
            tokens[themeName][propName] = propValue.trim();
        }
    }

    return tokens;
}

const applyPrivateColorVariable = (
    theme: GravityTheme,
    themeType: Theme,
    cssVariable: string,
    value: string,
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

        theme.privateColors[mainColorToken][themeType][privateColorToken] = {
            value,
        };
    } catch (error) {
        console.error(error);
        return;
    }
};

const applyUtilityColorVariable = (
    theme: GravityTheme,
    themeType: Theme,
    cssVariable: string,
    value: string,
) => {
    const utilityColorType = getUtilityColorTypeFromCssVariable(cssVariable);

    if (!utilityColorType) {
        console.error(`Error when parse utility variable ${cssVariable}`);
        return;
    }

    let newValue = value;
    let ref: string | undefined;

    const refCssVariable = parseCssReferenceVariable(value);
    if (refCssVariable) {
        if (!isPrivateColorCssVariable(refCssVariable)) {
            throw Error(
                `Utility color can use only private color variables. ${refCssVariable} is not private color`,
            );
        }

        const {mainColorToken, privateColorToken} = parsePrivateColorCssVariable(refCssVariable);
        newValue = createInternalPrivateColorReference(mainColorToken, privateColorToken);
        ref = refCssVariable;
    }

    theme.utilityColors[utilityColorType][themeType] = {value: newValue, ref};
};

const applyFontVariable = (theme: GravityTheme, cssVariable: string, value: string) => {
    const fontParams = parseCssFontFamily(value);

    if (!fontParams) {
        console.error(`Can't parse font variable ${cssVariable}`);
        return;
    }

    const key = getKeyFromCssFontVariable(cssVariable);

    theme.typography.fontFamilies[key] = {
        ...theme.typography.fontFamilies[key],
        mainFont: fontParams.mainFont,
        fallbackFonts: fontParams.fallbackFonts,
    };
};

const applyTextVariable = (theme: GravityTheme, cssVariable: string, value: string) => {
    const parseResult = parseTextCssVariable(cssVariable);

    if (!parseResult) {
        console.error(`Can't parse text variable ${cssVariable}`);
        return;
    }

    if ('variant' in parseResult) {
        const {variant, property} = parseResult;
        theme.typography.variants[variant][property] = value;
    } else {
        const {group, property} = parseResult;
        if (property === 'font-family') {
            const cssReference = parseCssReferenceVariable(value);
            if (cssReference) {
                if (!isFontCssVariable(cssReference)) {
                    throw Error(
                        `Text group font-family can reference only to font-families. ${cssReference} is not gravity font-family`,
                    );
                }

                theme.typography.groups[group][property] = getKeyFromCssFontVariable(cssReference);
            } else {
                theme.typography.groups[group][property] = value;
            }
        } else {
            theme.typography.groups[group][property] = value;
        }
    }
};

const applyBorderRadiusVariable = (theme: GravityTheme, cssVariable: string, value: string) => {
    const size = getSizeFromCssBorderSizeVariable(cssVariable);

    if (!size) {
        console.error(`Error when parse border radius variable ${cssVariable}`);
        return;
    }

    theme.borders[size] = value;
};

/*
На входе строка вида:
.g-root_theme_light {
    --g-color-private-brand-50: rgba(203,255,92,0.1);
    --g-color-base-brand-hover: var(--g-color-private-brand-600-solid);
}

.g-root_theme_dark {
    --g-color-private-brand-50: rgba(203,255,92,0.1);
    --g-color-base-brand-hover: var(--g-color-private-brand-650-solid);
}
*/
export function parseCSS(cssString: string): GravityTheme {
    const themeTokens = parseThemeTokens(cssString);
    const theme = cloneDeep(DEFAULT_THEME);

    for (const themeType of ['light', 'dark'] as const) {
        for (const [variable, value] of Object.entries(themeTokens[themeType])) {
            if (isColorCssVariable(variable)) {
                if (isPrivateColorCssVariable(variable)) {
                    applyPrivateColorVariable(theme, themeType, variable, value);
                } else if (isUtilityColorCssVariable(variable)) {
                    applyUtilityColorVariable(theme, themeType, variable, value);
                } else {
                    console.error(`Unsupported css variable ${variable}. Skip`);
                }
            } else if (isFontCssVariable(variable)) {
                // TODO переменная должна парситься из глобальных стилей .g-root, а не из light/dark
                applyFontVariable(theme, variable, value);
            } else if (isTextCssVariable(variable)) {
                // TODO переменная должна парситься из глобальных стилей .g-root, а не из light/dark
                applyTextVariable(theme, variable, value);
            } else if (isBorderRadiusCssVariable(variable)) {
                // TODO переменная должна парситься из глобальных стилей .g-root, а не из light/dark
                applyBorderRadiusVariable(theme, variable, value);
            } else {
                console.error(`Unsupported css variable ${variable}. Skip`);
            }
        }
    }

    theme.utilityColors = replaceReferencesInUtilityColors(
        theme.utilityColors,
        theme.privateColors,
    );

    theme.baseColors = restoreBaseColorsFromPrivateColors(theme.baseColors, theme.privateColors);

    return theme;
}
