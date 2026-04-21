import type {ThemizedColorOptions} from '../../types.js';

export const UTILITY_ILLUSTRATIONS_COLORS = [
    'object-base',
    'object-hightlight',
    'object-accent-heavy',
    'object-accent-light',
    'object-danger',
    'shadow-over-object',
    'background-lines',
    'background-shapes',
] as const;

export type UtilityIllustrationColor = (typeof UTILITY_ILLUSTRATIONS_COLORS)[number];
export type IllustrationColors = Record<UtilityIllustrationColor, ThemizedColorOptions>;
