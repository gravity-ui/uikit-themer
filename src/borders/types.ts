export const BORDER_SIZES = ['xs', 's', 'm', 'l', 'xl'] as const;
export type BorderSize = (typeof BORDER_SIZES)[number];

export type BordersOptions = Record<BorderSize, string>;
