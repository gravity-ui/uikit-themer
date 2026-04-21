export {generatePrivateColors} from './private-colors/index.js';
export type {
    PrivateColorToken,
    PrivateSolidColorToken,
    AnyPrivateColorToken,
} from './private-colors/types.js';

export {generateCSS} from './css/generate.js';
export {parseCSS} from './css/parse.js';

export {generateJSON} from './json/generate.js';
export {parseJSON} from './json/parse.js';
export type {JsonTheme, ThemizedValueWithReference, ValueWithReference} from './json/types.js';
export {isValueWithReference, isThemizedValueWithReference} from './json/types.js';

export {convertCSStoJSON, convertJSONtoCSS} from './converter.js';

export {
    isColorCssVariable,
    isUtilityColorCssVariable,
    isPrivateColorCssVariable,
    parsePrivateColorCssVariable,
    createPrivateColorCssVariable,
    createUtilityColorCssVariable,
    getUtilityColorTypeFromCssVariable,
    createInternalPrivateColorReference,
    isInternalPrivateColorReference,
    isInternalUtilityColorReference,
    parseInternalPrivateColorReference,
    updateBaseColor,
    removeBaseColor,
    updateUtilityColor,
    generatePrivateColorsForBaseColors,
    isUtilityColorToken,
    createInternalUtilityColorReference,
    parseInternalUtilityColorReference,
} from './utils.js';

export {
    isIllustrationColorCssVariable,
    createIllustrationColorCssVariable,
    getIllustrationColorTypeFromCssVariable,
    isUtilityIllustrationColorToken,
    isInternalUtilityIllustrationColorReference,
    replaceReferencesInIllustrationColors,
    parseInternalUtilityIllustrationColorReference,
    createInternalUtilityIllustrationColorReference,
} from './libraries/illustrations/utils.js';

export type {
    UtilityIllustrationColor,
    IllustrationColors,
} from './libraries/illustrations/types.js';
export {UTILITY_ILLUSTRATIONS_COLORS} from './libraries/illustrations/types.js';

export {DEFAULT_ILLUSTRATION_COLORS} from './libraries/illustrations/constants.js';
export {DEFAULT_THEME_ILLUSTRATION_COLORS} from './constants.js';

export type {
    TypographyOptions,
    TextGroup,
    TextVariant,
    TextBodyVariant,
    TextCaptionVariant,
    TextHeaderVariant,
    TextSubheaderVariant,
    TextDisplayVariant,
    TextCodeVariant,
    TextVariantOptions,
    TextVariantProperty,
    FontOptions,
    TextGroupOptions,
    FontFamilies,
    DefaultFontFamily,
} from './typography/types.js';
export {TEXT_VARIANTS, TEXT_GROUP_PROPERTIES, TEXT_VARIANT_PROPERTIES} from './typography/types.js';
export {
    isTextCssVariable,
    isFontCssVariable,
    createFontCssVariable,
    createTextCssVariable,
    getKeyFromCssFontVariable,
    parseTextCssVariable,
    generateCssFontFamily,
} from './typography/utils.js';

export type {BorderSize, BordersOptions} from './borders/types.js';
export {BORDER_SIZES} from './borders/types.js';
export {isBorderRadiusCssVariable, createBorderRadiusCssVariable} from './borders/utils.js';

export {DEFAULT_THEME} from './constants.js';

export type {
    GravityTheme,
    PrivateColorOptions,
    PrivateColors,
    BaseColors,
    UtilityColor,
    ThemizedColorOptions,
    ColorOptions,
    Theme,
} from './types.js';

export type {GravityLibrary, GravityThemeLibraryColors} from './libraries/types.js';
