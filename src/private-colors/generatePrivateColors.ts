import chroma from 'chroma-js';

import {
    THEME_PRESET,
    COLORS_MAP,
    BASE_PRIVATE_VARIABLES,
    BASE_PRIVATE_SOLID_VARIABLES,
} from './constants.js';
import type {AnyPrivateColorToken} from './types.js';

type Theme = 'light' | 'dark';

type GeneratePrivateColorsArgs = {
    theme: Theme;
    colorToken: string;
    colorValue: string;
    lightBg: string;
    darkBg: string;
};

export const generatePrivateColors = ({
    theme,
    colorToken,
    colorValue,
    lightBg,
    darkBg,
}: GeneratePrivateColorsArgs) => {
    const privateColors: Partial<Record<AnyPrivateColorToken, string>> = {};

    if (!chroma.valid(colorValue)) {
        throw Error('Not valid color for chroma');
    }

    let colorsMapInternal = COLORS_MAP;

    if (colorToken === 'white' || colorToken === 'black') {
        colorsMapInternal = THEME_PRESET[theme][colorToken].colorsMap;
    }

    const pallete = Object.entries(colorsMapInternal).reduce<Record<string, [string, string]>>(
        (res, [key, {a, c}]) => {
            const light = theme === 'dark' ? darkBg : lightBg;
            const dark = theme === 'dark' ? lightBg : darkBg;

            const solidColor = chroma.mix(colorValue, c > 0 ? dark : light, 1 - a, 'rgb').css();

            const alphaColor = chroma(colorValue).alpha(a).css();
            res[key] = [solidColor, alphaColor];

            return res;
        },
        {},
    );

    let privateSolidVariablesInternal = BASE_PRIVATE_SOLID_VARIABLES;
    let privateVariablesInternal = BASE_PRIVATE_VARIABLES;

    if (colorToken === 'white' || colorToken === 'black') {
        privateSolidVariablesInternal = THEME_PRESET[theme][colorToken].privateSolidVariables;
        privateVariablesInternal = THEME_PRESET[theme][colorToken].privateVariables;
    }

    if (colorToken === 'white' || colorToken === 'black') {
        privateColors['1000-solid'] = chroma(colorValue).css();
    } else {
        privateColors['550-solid'] = chroma(colorValue).css();
    }

    // Set 50-1000 Solid Colors, except 550 Solid Color
    privateSolidVariablesInternal.forEach((varName) => {
        const normalizedKey = varName.split('-')[0] as string;
        privateColors[varName] = chroma(pallete[normalizedKey]![0]).css();
    });

    // Set 50-500 Colors
    privateVariablesInternal.forEach((varName) => {
        if (varName === 'opaque-150') {
            if (theme === 'dark' && colorToken === 'white') {
                const updatedColor = chroma(pallete[150]![0]).alpha(0.95).css();
                privateColors['opaque-150'] = chroma(updatedColor).css();
            }
        } else {
            privateColors[varName] = chroma(pallete[varName]![1]).css();
        }
    });

    return privateColors;
};
