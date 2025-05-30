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
import {createPrivateColorCssVariable, createUtilityColorCssVariable} from '../utils.js';
import type {BorderSize} from '../borders/types.js';
import {createBorderRadiusCssVariable} from '../borders/utils.js';

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

    const createUtilityColorExport = (
        theme: GravityTheme,
        themeVariant: Theme,
        utilityColor: UtilityColor,
    ) => {
        const {ref, value} = theme.utilityColors[utilityColor][themeVariant];
        const resultValue = ref ? `var(${ref})` : value;

        return [
            createUtilityColorCssVariable(utilityColor),
            `${resultValue}${forPreview ? ' !important' : ''};`,
        ].join(': ');
    };

    const prepareThemeVariables = (themeVariant: Theme) => {
        let cssVariables = '';

        Object.entries(theme.baseColors).forEach(([token, colorOptions]) => {
            // Dont export colors that are equals to default (except brand color)
            // Private colors recalculate when background color changes
            const valueEqualsToDefault =
                DEFAULT_THEME.baseColors[token]?.[themeVariant].value ===
                    colorOptions[themeVariant].value &&
                token !== 'brand' &&
                !backgroundColorChanged;

            if (valueEqualsToDefault && ignoreDefaultValues) {
                return;
            }

            const needExportColor =
                backgroundColorChanged || token === 'brand' || !valueEqualsToDefault;

            if (!needExportColor) {
                return;
            }

            if (theme.privateColors[token]?.[themeVariant]) {
                Object.entries(theme.privateColors[token][themeVariant]).forEach(
                    ([privateColorToken, color]) => {
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

        cssVariables += `${createUtilityColorCssVariable('base-brand')}: ${
            theme.baseColors.brand[themeVariant].value
        }${forPreview ? ' !important' : ''};\n`;

        Object.keys(theme.utilityColors).forEach((utilityColor) => {
            if (utilityColor === 'base-brand') {
                return;
            }
            cssVariables += `${createUtilityColorExport(theme, themeVariant, utilityColor as UtilityColor)}\n`;
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

    return CSS_TEMPLATE.replace(COMMON_VARIABLES_TEMPLATE_NAME, themeParams.common)
        .replace(LIGHT_THEME_VARIABLES_TEMPLATE_NAME, themeParams.light)
        .replace(DARK_THEME_VARIABLES_TEMPLATE_NAME, themeParams.dark);
}
