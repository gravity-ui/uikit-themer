import {parseCSS} from '../parse.js';

describe('parseCSS', () => {
    it('utility colors', async () => {
        const result = parseCSS(`
.g-root_theme_light {
    --g-color-base-background: rgb(231,231,232);
}

.g-root_theme_dark {
    --g-color-base-background: rgb(123, 123, 222);
}
        `);

        expect(result.utilityColors['base-background']).toEqual({
            dark: {
                value: 'rgb(123, 123, 222)',
            },
            light: {
                value: 'rgb(231,231,232)',
            },
        });
    });

    it('utility colors with private references', async () => {
        const result = parseCSS(`
.g-root_theme_light {
    --g-color-private-brand-200: rgba(203,255,92,0.1);
    --g-color-base-brand-hover: var(--g-color-private-brand-200);
}

.g-root_theme_dark {
    --g-color-private-brand-50: rgba(11,20,33,0.1);
    --g-color-base-brand-hover: var(--g-color-private-brand-50);
}
        `);

        expect(result.utilityColors['base-brand-hover']).toEqual({
            dark: {
                ref: '--g-color-private-brand-50',
                value: 'rgba(11,20,33,0.1)',
            },
            light: {
                ref: '--g-color-private-brand-200',
                value: 'rgba(203,255,92,0.1)',
            },
        });
    });

    it('parse font families', async () => {
        const result = parseCSS(`
.g-root_theme_light {
    --g-font-family-sans: 'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    --g-font-family-monospace: 'Roboto Mono', 'Menlo', 'Monaco', 'Consolas', 'Ubuntu Mono', 'Liberation Mono', 'DejaVu Sans Mono', 'Courier New', 'Courier', monospace;
    --g-font-family-additional-1: 'Custom', 'Raz', 'Dva', 'Tri';
    --g-font-family-additional-123: 'Custom111';
}

.g-root_theme_dark {
    --g-font-family-sans: 'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    --g-font-family-monospace: 'Roboto Mono', 'Menlo', 'Monaco', 'Consolas', 'Ubuntu Mono', 'Liberation Mono', 'DejaVu Sans Mono', 'Courier New', 'Courier', monospace;
    --g-font-family-additional-1: 'Custom', 'Raz', 'Dva', 'Tri', sans-serif;
    --g-font-family-additional-123: 'Custom111';
}
        `);

        expect(result.typography.fontFamilies).toEqual({
            'additional-1': {
                fallbackFonts: ['Raz', 'Dva', 'Tri'],
                mainFont: 'Custom',
            },
            'additional-123': {
                fallbackFonts: [],
                mainFont: 'Custom111',
            },
            sans: {
                fallbackFonts: ['Helvetica Neue', 'Helvetica', 'Arial'],
                mainFont: 'Inter',
            },
            monospace: {
                fallbackFonts: [
                    'Menlo',
                    'Monaco',
                    'Consolas',
                    'Ubuntu Mono',
                    'Liberation Mono',
                    'DejaVu Sans Mono',
                    'Courier New',
                    'Courier',
                ],
                mainFont: 'Roboto Mono',
            },
        });
    });

    it('parse text group font family', async () => {
        const result = parseCSS(`
.g-root_theme_light {
    --g-font-family-additional-123: 'Custom111';
    --g-text-code-font-family: var(--g-font-family-additional-123);
}

.g-root_theme_dark {
    --g-font-family-additional-123: 'Custom111';
    --g-text-code-font-family: var(--g-font-family-additional-123);
}
        `);

        expect(result.typography.groups.code).toEqual({
            'font-family': 'additional-123',
            'font-weight': 400,
        });
    });

    it('parse text group font weight', async () => {
        const result = parseCSS(`
.g-root_theme_light {
    --g-text-code-font-weight: 700;
}

.g-root_theme_dark {
    --g-text-code-font-weight: 700;
}
        `);

        expect(result.typography.groups.code['font-weight']).toEqual('700');
    });
});
