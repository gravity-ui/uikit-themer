#!/usr/bin/env node

// This script is used to generate a default Gravity UIKit styles file.

import {writeFile, mkdir, stat} from 'fs/promises';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cssPath = join(__dirname, '../styles/default.css');

async function generateDefaultStyles() {
    try {
        const {generateCSS, DEFAULT_THEME} = await import('../dist/index.js');

        const css = generateCSS({
            theme: DEFAULT_THEME,
            ignoreDefaultValues: false,
            forPreview: false,
        });

        if (!(await stat(dirname(cssPath)))) {
            await mkdir(dirname(cssPath), {recursive: true});
        }
        await writeFile(cssPath, css, 'utf8');

        // eslint-disable-next-line no-undef
        console.log('✅ File styles/default.css generated');
    } catch (error) {
        // eslint-disable-next-line no-undef
        console.error('❌ Error generating default styles:', error);
        // eslint-disable-next-line no-undef
        console.error('💡 Make sure the project is compiled: npm run build');
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
}

generateDefaultStyles();
