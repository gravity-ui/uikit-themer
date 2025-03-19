export const TEXT_GROUP_PROPERTIES = ['font-weight', 'font-family'] as const;
export type TextGroupProperty = (typeof TEXT_GROUP_PROPERTIES)[number];

export const TEXT_VARIANT_PROPERTIES = ['font-size', 'line-height'] as const;
export type TextVariantProperty = (typeof TEXT_VARIANT_PROPERTIES)[number];

export const TEXT_GROUPS = ['body', 'caption', 'header', 'subheader', 'display', 'code'] as const;

export type TextGroup = (typeof TEXT_GROUPS)[number];

export const TEXT_VARIANTS = {
    body: ['body-short', 'body-1', 'body-2', 'body-3'] as const,
    caption: ['caption-1', 'caption-2'] as const,
    header: ['header-1', 'header-2'] as const,
    subheader: ['subheader-1', 'subheader-2', 'subheader-3'] as const,
    display: ['display-1', 'display-2', 'display-3', 'display-4'] as const,
    code: [
        'code-1',
        'code-inline-1',
        'code-2',
        'code-inline-2',
        'code-3',
        'code-inline-3',
    ] as const,
} as const;

export type TextVariant<T extends TextGroup = TextGroup> = (typeof TEXT_VARIANTS)[T][number];

export type TextBodyVariant = TextVariant<'body'>;
export type TextCaptionVariant = TextVariant<'caption'>;
export type TextHeaderVariant = TextVariant<'header'>;
export type TextSubheaderVariant = TextVariant<'subheader'>;
export type TextDisplayVariant = TextVariant<'display'>;
export type TextCodeVariant = TextVariant<'code'>;

export type FontOptions = {
    mainFont: string;
    fallbackFonts: string[];
};

export type TextGroupOptions = {
    'font-family': string;
    'font-weight': number | string;
};

export type TextVariantOptions = {
    'font-size': string;
    'line-height': string;
};

export type TypographyOptions = {
    fontImports: string[];
    fontFamilies: Record<string, FontOptions>;
    groups: Record<TextGroup, TextGroupOptions>;
    variants: Record<TextVariant, TextVariantOptions>;
};
