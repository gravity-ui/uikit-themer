import {generateCSS} from './css/generate.js';
import {parseCSS} from './css/parse.js';
import {generateJSON} from './json/generate.js';
import {parseJSON} from './json/parse.js';
import type {JsonTheme} from './json/types.js';
import type {GenerateOptions} from './types.js';

/**
 * Converts a JSON theme to CSS format.
 * @param input - The JSON theme to convert
 * @returns CSS string representation of the theme
 */
export const convertJSONtoCSS = (input: JsonTheme, options?: Omit<GenerateOptions, 'theme'>) => {
    const theme = parseJSON(input);
    return generateCSS({theme, ...options});
};

/**
 * Converts a CSS theme to JSON format.
 * @param input - The CSS string to convert
 * @returns JSON theme representation
 */
export const convertCSStoJSON = (input: string, options?: Omit<GenerateOptions, 'theme'>) => {
    const theme = parseCSS(input);
    return generateJSON({theme, ...options});
};
