import type {TypographyOptions} from './types.js';

export const DEFAULT_TYPOGRAPHY_OPTIONS: TypographyOptions = {
    fontImports: [],
    fontFamilies: {
        sans: {
            mainFont: 'Inter',
            fallbackFonts: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        },
        monospace: {
            mainFont: 'Menlo',
            fallbackFonts: [
                'Monaco',
                'Consolas',
                'Liberation Mono',
                'Ubuntu Mono',
                'DejaVu Sans Mono',
                'Courier New',
                'Courier',
                'monospace',
            ],
        },
    },
    variants: {
        'body-short': {
            'font-size': '13px',
            'line-height': '16px',
        },
        'body-1': {
            'font-size': '13px',
            'line-height': '18px',
        },
        'body-2': {
            'font-size': '15px',
            'line-height': '20px',
        },
        'body-3': {
            'font-size': '17px',
            'line-height': '24px',
        },
        'caption-1': {
            'font-size': '9px',
            'line-height': '12px',
        },
        'caption-2': {
            'font-size': '11px',
            'line-height': '16px',
        },
        'code-1': {
            'font-size': '12px',
            'line-height': '18px',
        },
        'code-inline-1': {
            'font-size': '12px',
            'line-height': '14px',
        },
        'code-2': {
            'font-size': '14px',
            'line-height': '20px',
        },
        'code-inline-2': {
            'font-size': '14px',
            'line-height': '16px',
        },
        'code-3': {
            'font-size': '16px',
            'line-height': '24px',
        },
        'code-inline-3': {
            'font-size': '16px',
            'line-height': '20px',
        },
        'display-1': {
            'font-size': '28px',
            'line-height': '36px',
        },
        'display-2': {
            'font-size': '32px',
            'line-height': '40px',
        },
        'display-3': {
            'font-size': '40px',
            'line-height': '48px',
        },
        'display-4': {
            'font-size': '48px',
            'line-height': '52px',
        },
        'header-1': {
            'font-size': '20px',
            'line-height': '24px',
        },
        'header-2': {
            'font-size': '24px',
            'line-height': '28px',
        },
        'subheader-1': {
            'font-size': '13px',
            'line-height': '18px',
        },
        'subheader-2': {
            'font-size': '15px',
            'line-height': '20px',
        },
        'subheader-3': {
            'font-size': '17px',
            'line-height': '24px',
        },
    },
    groups: {
        body: {
            'font-family': 'sans',
            'font-weight': 400,
        },
        caption: {
            'font-family': 'sans',
            'font-weight': 400,
        },
        code: {
            'font-family': 'monospace',
            'font-weight': 400,
        },
        display: {
            'font-family': 'sans',
            'font-weight': 600,
        },
        header: {
            'font-family': 'sans',
            'font-weight': 600,
        },
        subheader: {
            'font-family': 'sans',
            'font-weight': 600,
        },
    },
};
