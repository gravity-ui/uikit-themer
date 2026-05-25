import {createInternalPrivateColorReference} from '../../utils.js';
import type {IllustrationColors} from './types.js';

export const DEFAULT_ILLUSTRATION_COLORS: IllustrationColors = {
    'object-base': {
        dark: {value: createInternalPrivateColorReference('brand', '550-solid')},
        light: {value: createInternalPrivateColorReference('brand', '550-solid')},
    },
    'object-hightlight': {
        dark: {value: createInternalPrivateColorReference('brand', '700-solid')},
        light: {value: createInternalPrivateColorReference('brand', '350-solid')},
    },
    'object-accent-heavy': {
        dark: {value: createInternalPrivateColorReference('brand', '350-solid')},
        light: {value: createInternalPrivateColorReference('brand', '650-solid')},
    },
    'object-accent-light': {
        dark: {value: createInternalPrivateColorReference('white', '1000-solid')},
        light: {value: createInternalPrivateColorReference('white', '1000-solid')},
    },
    'object-danger': {
        dark: {value: createInternalPrivateColorReference('red', '550-solid')},
        light: {value: createInternalPrivateColorReference('red', '550-solid')},
    },
    'shadow-over-object': {
        dark: {value: createInternalPrivateColorReference('brand', '500-solid')},
        light: {value: createInternalPrivateColorReference('brand', '650-solid')},
    },
    'background-lines': {
        dark: {value: createInternalPrivateColorReference('brand', '650-solid')},
        light: {value: createInternalPrivateColorReference('brand', '650-solid')},
    },
    'background-shapes': {
        dark: {value: createInternalPrivateColorReference('brand', '200-solid')},
        light: {value: createInternalPrivateColorReference('brand', '100-solid')},
    },
};
