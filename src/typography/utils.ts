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

const FONT_FAMILY_TYPES = new Set([
    'sans-serif',
    'serif',
    'monospace',
    'cursive',
    'fantasy',
    'system-ui',
]);

type FontFamilyDetails = {
    mainFont: string;
    fallbackFonts: string[];
};

/**
 * Parses a CSS font-family value into components.
 * @param fontFamilyValue - The CSS font-family value to parse
 * @returns Parsed font family details or undefined if invalid
 */
export function parseCssFontFamily(fontFamilyValue: string): FontFamilyDetails | undefined {
    const regex = /(?:["']([^"']+)["']|([^,'" \n]+))/g;

    const fonts = [];
    let match;
    while ((match = regex.exec(fontFamilyValue)) !== null) {
        // Font names may have line breaks or spaces at the beginning/end
        const font = (match[1]! || match[2]!).trim();
        if (font) {
            fonts.push(font);
        }
    }

    if (fonts.length === 0) {
        return undefined;
    }

    const [mainFont, ...fallbackFonts] = fonts;

    return {
        mainFont: mainFont!,
        fallbackFonts,
    };
}

/**
 * Generates a CSS font-family value from font options.
 * @param value - The font options to convert
 * @returns CSS font-family string
 */
export function generateCssFontFamily(value: FontOptions) {
    return [value.mainFont, ...value.fallbackFonts]
        .map((el) => (FONT_FAMILY_TYPES.has(el) ? el : `'${el}'`))
        .join(', ');
}

/**
 * Checks if a CSS variable belongs to text variables.
 *
 * @example
 * isTextCssVariable('--g-text-body-font-weight') === true
 * isTextCssVariable('--g-color-text-link-visited') === false
 *
 * @param variable - CSS variable name
 * @returns True if the variable is a text CSS variable
 */
export function isTextCssVariable(variable: string) {
    return variable.startsWith(THEME_TEXT_VARIABLE_PREFIX);
}

/**
 * Checks if a CSS variable belongs to font variables.
 *
 * @example
 * isFontCssVariable('--g-font-family-sans') === true
 * isFontCssVariable('--g-font-family-additional-font-1') === true
 * isFontCssVariable('--g-text-body-font-weight') === false
 *
 * @param variable - CSS variable name
 * @returns True if the variable is a font CSS variable
 */
export function isFontCssVariable(variable: string) {
    return variable.startsWith(THEME_FONT_VARIABLE_PREFIX);
}

/**
 * Creates a font CSS variable from a key.
 * @param key - The font key
 * @returns CSS variable string
 */
export function createFontCssVariable(key: string) {
    return `${THEME_FONT_VARIABLE_PREFIX}-${key}`;
}

/**
 * Extracts key from a font CSS variable.
 *
 * @example
 * getKeyFromCssFontVariable('--g-font-family-sans') === 'sans'
 * getKeyFromCssFontVariable('--g-font-family-additional-font-1') === 'additional-font-1'
 *
 * @param variable - CSS variable string
 * @returns The extracted key
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
 * Extracts text group, variant, and property from a text CSS variable.
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
 * @param variable - CSS variable string
 * @returns Parsed text CSS variable components or undefined if invalid
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

    // First, try to match one of the GROUP variants, considering the GROUP in the variant name
    for (const variant of TEXT_VARIANTS[group]) {
        const variantParts = variant.split('-');
        const variantLength = variantParts.length;

        // The variant must match completely, then there should still be parts with the property name
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

    // If variants didn't match - check the group's own properties (e.g. font-weight or font-family)
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

/**
 * Creates a text CSS variable from the provided arguments.
 * @param args - Arguments containing group, variant, and property
 * @returns CSS variable string
 */
export function createTextCssVariable({group, variant, property}: CreateTextCssVariableArgs) {
    if (variant) {
        return `${THEME_TEXT_VARIABLE_PREFIX}-${variant}-${property}`;
    }

    return `${THEME_TEXT_VARIABLE_PREFIX}-${group}-${property}`;
}
