import {isEqual} from 'lodash-es';
import {DEFAULT_THEME} from '../constants.js';
import type {AnyPrivateColorToken} from '../private-colors/types.js';
import type {GenerateOptions, GravityTheme, Theme, UtilityColor} from '../types.js';
import {
    TEXT_GROUP_PROPERTIES,
    TEXT_VARIANT_PROPERTIES,
    type TextGroup,
    type TextVariant,
} from '../typography/types.js';
import {
    createFontCssVariable,
    createTextCssVariable,
    generateCssFontFamily,
} from '../typography/utils.js';
import {
    createPrivateColorCssVariable,
    createUtilityColorCssVariable,
    isInternalPrivateColorReference,
    isInternalUtilityColorReference,
    parseInternalPrivateColorReference,
    parseInternalUtilityColorReference,
} from '../utils.js';
import type {BorderSize} from '../borders/types.js';
import {createBorderRadiusCssVariable} from '../borders/utils.js';

/**
 * Adds indentation to each line of a string
 * @param text - Text to indent
 * @param spaces - Number of spaces for indentation
 * @returns Indented text
 */
const addIndentation = (text: string, spaces: number = 4): string => {
    const indent = ' '.repeat(spaces);
    return text
        .split('\n')
        .map((line) => (line.trim() ? indent + line : line))
        .join('\n');
};

const COMMON_VARIABLES_TEMPLATE_NAME = '%COMMON_VARIABLES%';
const LIGHT_THEME_VARIABLES_TEMPLATE_NAME = '%LIGHT_THEME_VARIABLES%';
const DARK_THEME_VARIABLES_TEMPLATE_NAME = '%DARK_THEME_VARIABLES%';

const CSS_TEMPLATE = `
.g-root {
${COMMON_VARIABLES_TEMPLATE_NAME}
}

.g-root_theme_light {
${LIGHT_THEME_VARIABLES_TEMPLATE_NAME}
}

.g-root_theme_dark {
${DARK_THEME_VARIABLES_TEMPLATE_NAME}
}
`.trim();

const isBackgroundColorChanged = (theme: GravityTheme) => {
    return (
        !isEqual(
            DEFAULT_THEME.utilityColors['base-background'].dark,
            theme.utilityColors['base-background'].dark,
        ) ||
        !isEqual(
            DEFAULT_THEME.utilityColors['base-background'].light,
            theme.utilityColors['base-background'].light,
        )
    );
};

const createUtilityColorExport = (
    theme: GravityTheme,
    themeVariant: Theme,
    utilityColor: UtilityColor,
    forPreview?: boolean,
) => {
    const {ref, value} = theme.utilityColors[utilityColor][themeVariant];
    let resultValue = ref ? ref : value;

    if (isInternalPrivateColorReference(resultValue)) {
        const parseResult = parseInternalPrivateColorReference(resultValue);
        if (parseResult) {
            const {mainColorToken, privateColorCode} = parseResult;
            resultValue = `var(${createPrivateColorCssVariable(mainColorToken, privateColorCode)})`;
        }
    } else if (isInternalUtilityColorReference(resultValue)) {
        const utilityColor = parseInternalUtilityColorReference(resultValue);
        if (utilityColor) {
            resultValue = `var(${createUtilityColorCssVariable(utilityColor)})`;
        }
    }

    return [
        createUtilityColorCssVariable(utilityColor),
        `${resultValue}${forPreview ? ' !important' : ''};`,
    ].join(': ');
};

/*
Output example:

.g-root_theme_light {
    --g-color-private-brand-50: rgba(203,255,92,0.1);
    --g-color-base-brand-hover: var(--g-color-private-brand-600-solid);
}

.g-root_theme_dark {
    --g-color-private-brand-50: rgba(203,255,92,0.1);
    --g-color-base-brand-hover: var(--g-color-private-brand-650-solid);
}
*/
/**
 * Generates CSS string from a GravityTheme object.
 * @param options - The options for generating CSS
 * @returns CSS string representation of the theme
 */
export function generateCSS({theme, ignoreDefaultValues, forPreview}: GenerateOptions): string {
    const backgroundColorChanged = isBackgroundColorChanged(theme);

    const prepareThemeVariables = (themeVariant: Theme) => {
        let cssVariables = '';

        Object.entries(theme.baseColors).forEach(([token, colorOptions]) => {
            // Dont export colors that are equals to default
            // Private colors recalculate when background color changes
            const valueEqualsToDefault =
                DEFAULT_THEME.baseColors[token]?.[themeVariant].value ===
                    colorOptions[themeVariant].value && !backgroundColorChanged;

            if (valueEqualsToDefault && ignoreDefaultValues) {
                return;
            }

            if (theme.privateColors[token]?.[themeVariant]) {
                Object.entries(theme.privateColors[token][themeVariant]).forEach(
                    ([privateColorToken, color]) => {
                        const valueInDefaultTheme =
                            DEFAULT_THEME.privateColors?.[token]?.[themeVariant]?.[
                                privateColorToken as AnyPrivateColorToken
                            ]?.value;

                        const colorEqualsToDefault =
                            valueInDefaultTheme === color.value &&
                            valueInDefaultTheme !== undefined;

                        if (ignoreDefaultValues && colorEqualsToDefault) {
                            return;
                        }

                        cssVariables += `${createPrivateColorCssVariable(
                            token,
                            privateColorToken as AnyPrivateColorToken,
                        )}: ${color.value}${forPreview ? ' !important' : ''};\n`;
                    },
                );
                cssVariables += '\n';
            }
        });

        cssVariables += '\n';

        Object.keys(theme.utilityColors).forEach((_utilityColor) => {
            const utilityColor = _utilityColor as UtilityColor;

            // Dont export colors that are equals to default
            const valueEqualsToDefault =
                DEFAULT_THEME.utilityColors[utilityColor][themeVariant].value ===
                    theme.utilityColors[utilityColor][themeVariant].value ||
                (DEFAULT_THEME.utilityColors[utilityColor][themeVariant].ref &&
                    DEFAULT_THEME.utilityColors[utilityColor][themeVariant].ref ===
                        theme.utilityColors[utilityColor][themeVariant].ref);

            if (valueEqualsToDefault && ignoreDefaultValues) {
                return;
            }

            cssVariables += `${createUtilityColorExport(theme, themeVariant, utilityColor, forPreview)}\n`;
        });

        return cssVariables.trim();
    };

    const prepateBordersVariables = () => {
        let cssVariables = '';

        for (const [size, value] of Object.entries(theme.borders)) {
            if (ignoreDefaultValues && isEqual(DEFAULT_THEME.borders[size as BorderSize], value)) {
                continue;
            }

            const entry = [
                createBorderRadiusCssVariable(size as BorderSize),
                `${value}${forPreview ? ' !important' : ''};`,
            ].join(': ');
            cssVariables += entry + '\n';
        }

        return cssVariables;
    };

    const prepareTypographyVariables = () => {
        let cssVariables = '';

        for (const [key, value] of Object.entries(theme.typography.fontFamilies)) {
            if (ignoreDefaultValues && isEqual(DEFAULT_THEME.typography.fontFamilies[key], value)) {
                continue;
            }

            if (!value) {
                continue;
            }

            const entry = [
                createFontCssVariable(key),
                `${generateCssFontFamily(value)}${forPreview ? ' !important' : ''};`,
            ].join(': ');
            cssVariables += entry + '\n';
        }

        for (const [group, value] of Object.entries(theme.typography.groups)) {
            for (const property of TEXT_GROUP_PROPERTIES) {
                const cssVariable = createTextCssVariable({
                    group: group as TextGroup,
                    property,
                });

                if (
                    ignoreDefaultValues &&
                    isEqual(
                        DEFAULT_THEME.typography.groups[group as TextGroup][property],
                        value[property],
                    )
                ) {
                    continue;
                }

                if (property === 'font-family') {
                    const val = value[property];
                    const refCssVariable = createFontCssVariable(val);
                    const entry = [
                        cssVariable,
                        `var(${refCssVariable})${forPreview ? ' !important' : ''};`,
                    ].join(': ');
                    cssVariables += entry + '\n';
                } else {
                    const entry = [
                        cssVariable,
                        `${value[property]}${forPreview ? ' !important' : ''};`,
                    ].join(': ');
                    cssVariables += entry + '\n';
                }
            }
        }

        for (const [variant, value] of Object.entries(theme.typography.variants)) {
            for (const property of TEXT_VARIANT_PROPERTIES) {
                if (
                    ignoreDefaultValues &&
                    isEqual(
                        DEFAULT_THEME.typography.variants[variant as TextVariant][property],
                        value[property],
                    )
                ) {
                    continue;
                }

                const cssVariable = createTextCssVariable({
                    property,
                    variant: variant as TextVariant,
                });
                const entry = [
                    cssVariable,
                    `${value[property]}${forPreview ? ' !important' : ''};`,
                ].join(': ');
                cssVariables += entry + '\n';
            }
        }

        return cssVariables.trim();
    };

    const prepareCommonVariables = () => {
        return [prepateBordersVariables(), prepareTypographyVariables()].join('\n').trim();
    };

    const themeParams = {
        common: prepareCommonVariables(),
        light: prepareThemeVariables('light'),
        dark: prepareThemeVariables('dark'),
    };

    return CSS_TEMPLATE.replace(COMMON_VARIABLES_TEMPLATE_NAME, addIndentation(themeParams.common))
        .replace(LIGHT_THEME_VARIABLES_TEMPLATE_NAME, addIndentation(themeParams.light))
        .replace(DARK_THEME_VARIABLES_TEMPLATE_NAME, addIndentation(themeParams.dark))
        .replace(/\n{3,}/g, '\n\n');
}
