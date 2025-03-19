import {generateCSS} from './css/generate.js';
import {parseCSS} from './css/parse.js';
import {generateJSON} from './json/generate.js';
import {parseJSON} from './json/parse.js';
import type {JsonTheme} from './json/types.js';

export const convertJSONtoCSS = (input: JsonTheme) => {
    const theme = parseJSON(input);
    return generateCSS(theme);
};

export const convertCSStoJSON = (input: string) => {
    const theme = parseCSS(input);
    return generateJSON(theme);
};
