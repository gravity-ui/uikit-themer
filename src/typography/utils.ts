import {THEME_FONT_VARIABLE_PREFIX, THEME_TEXT_VARIABLE_PREFIX} from '../variables.js';
import type {
    TextGroupProperty,
    TextGroup,
    TextVariantProperty,
    TextVariant,
    FontOptions,
} from './types.js';
import {
    TEXT_GROUPS,
    TEXT_VARIANTS,
    TEXT_VARIANT_PROPERTIES,
    TEXT_GROUP_PROPERTIES,
} from './types.js';

type FontFamilyType = 'monospace' | 'sans-serif';

type FontFamilyDetails = {
    mainFont: string;
    fallbackFonts: string[];
    type?: FontFamilyType;
};

/**
 * Парсит CSS свойство font-family и возвращает объект с основным шрифтом,
 * альтернативными шрифтами и типом семьи шрифтов.
 *
 * @param {string} fontFamilyValue - строка font-family из CSS
 * @returns {FontFamilyDetails}
 */
export function parseCssFontFamily(fontFamilyValue: string): FontFamilyDetails | undefined {
    const regex = /(?:["']([^"']+)["']|([^,'" \n]+))/g;

    const fonts = [];
    let match;
    while ((match = regex.exec(fontFamilyValue)) !== null) {
        // Названия шрифтов могут иметь переносы или пробелы в начале/конце
        const font = (match[1]! || match[2]!).trim();
        if (font) {
            fonts.push(font);
        }
    }

    if (fonts.length === 0) {
        return undefined;
    }

    // Последний шрифт предполагается типом семейства (sans-serif / monospace)
    const lastFont = fonts[fonts.length - 1]?.toLowerCase();
    let type: FontFamilyType | undefined;
    if (lastFont?.includes('mono')) {
        type = 'monospace';
    } else if (lastFont?.includes('sans')) {
        type = 'sans-serif';
    } else if (lastFont === 'monospace' || lastFont === 'sans-serif') {
        type = lastFont;
    }

    return {
        mainFont: fonts[0]!,
        fallbackFonts: fonts.slice(1, -1),
        type,
    };
}

export function generateCssFontFamily(value: FontOptions) {
    return [value.mainFont, ...value.fallbackFonts].map((el) => `'${el}'`).join(', ');
}

/**
 * Проверяет принадлежность CSS-переменной к текстовым переменным.
 *
 * @example
 * isTextCssVariable('--g-text-body-font-weight') === true
 * isTextCssVariable('--g-color-text-link-visited') === false
 *
 * @param variable string
 * @returns boolean
 */
export function isTextCssVariable(variable: string) {
    return variable.startsWith(THEME_TEXT_VARIABLE_PREFIX);
}

/**
 * Проверяет принадлежность CSS-переменной к шрифтовым переменным.
 *
 * @example
 * isFontCssVariable('--g-font-family-sans') === true
 * isFontCssVariable('--g-font-family-additional-font-1') === true
 * isFontCssVariable('--g-text-body-font-weight') === false
 *
 * @param variable string
 * @returns boolean
 */
export function isFontCssVariable(variable: string) {
    return variable.startsWith(THEME_FONT_VARIABLE_PREFIX);
}

export function createFontCssVariable(key: string) {
    return `${THEME_FONT_VARIABLE_PREFIX}-${key}`;
}

/**
 * Извлекает ключ из шрифтовой CSS-переменной.
 *
 * @example
 * getKeyFromCssVariable('--g-font-family-sans') === 'sans'
 * getKeyFromCssVariable('--g-font-family-additional-font-1') === 'additional-font-1'
 *
 * @param variable string
 * @returns string
 */
export function getKeyFromCssFontVariable(variable: string) {
    return variable.replace(`${THEME_FONT_VARIABLE_PREFIX}-`, '');
}

type ParseTextCssVariableResult =
    | {
          group: TextGroup;
          property: TextGroupProperty;
      }
    | {
          group: TextGroup;
          variant: TextVariant;
          property: TextVariantProperty;
      };

/**
 * Извлекает группу текстов, вариант отображения и параметр.
 *
 * @example
 * parseTextCssVariable('--g-text-body-1-font-size') === {
 *      "group": "body",
 *      "variant": "body-1",
 *      "property": "font-size"
 * }
 * parseTextCssVariable('--g-text-body-1-font-size') === {
 *      "group": "body",
 *      "variant": "body-1"
 *      "property": "line-height"
 * }
 * parseTextCssVariable('--g-text-code-font-family') === {
 *      "group": "code",
 *      "property": "font-family"
 * }
 * parseTextCssVariable('--g-text-body-font-weight') === {
 *      "group": "body",
 *      "property": "font-weight"
 * }
 * parseTextCssVariable('--g-text-header-font-weight') === {
 *      "group": "header",
 *      "property": "font-weight"
 * }
 *
 * @param variable string
 */
export function parseTextCssVariable(variable: string): ParseTextCssVariableResult | undefined {
    if (!isTextCssVariable(variable)) {
        return undefined;
    }

    const variableContent = variable.slice(THEME_TEXT_VARIABLE_PREFIX.length + 1);
    const parts = variableContent.split('-');

    const [groupCandidate] = parts;
    if (!TEXT_GROUPS.includes(groupCandidate as TextGroup)) {
        return undefined;
    }

    const group = groupCandidate as TextGroup;

    // Сначала пытаемся сопоставить один из вариантов ГРУППЫ, учитывая ГРУППУ в названии варианта
    for (const variant of TEXT_VARIANTS[group]) {
        const variantParts = variant.split('-');
        const variantLength = variantParts.length;

        // Вариант должен совпасть полностью, затем должны остаться еще части с названием свойства
        if (parts.length <= variantLength) {
            continue;
        }

        const variantCandidate = parts.slice(0, variantLength).join('-');
        const propertyCandidate = parts.slice(variantLength).join('-');

        if (
            variantCandidate === variant &&
            TEXT_VARIANT_PROPERTIES.includes(propertyCandidate as TextVariantProperty)
        ) {
            return {
                group,
                variant,
                property: propertyCandidate as TextVariantProperty,
            };
        }
    }

    // Если варианты не подошли — проверим свойства самой группы (например: font-weight или font-family)
    const restPartsAfterGroup = parts.slice(1).join('-');
    if (TEXT_GROUP_PROPERTIES.includes(restPartsAfterGroup as TextGroupProperty)) {
        return {
            group,
            property: restPartsAfterGroup as TextGroupProperty,
        };
    }

    return undefined;
}

type CreateTextCssVariableArgs =
    | {
          group: TextGroup;
          variant?: TextVariant;
          property: TextGroupProperty | TextVariantProperty;
      }
    | {
          group?: TextGroup;
          variant: TextVariant;
          property: TextGroupProperty | TextVariantProperty;
      };

export function createTextCssVariable({group, variant, property}: CreateTextCssVariableArgs) {
    if (variant) {
        return `${THEME_TEXT_VARIABLE_PREFIX}-${variant}-${property}`;
    }

    return `${THEME_TEXT_VARIABLE_PREFIX}-${group}-${property}`;
}
