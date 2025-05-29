#!/usr/bin/env node

// This script is used to generate a precomputed version of the constants.js file.
// It replaces the DEFAULT_PRIVATE_COLORS and DEFAULT_THEME_UTILITY_COLORS variables with their precomputed values.
// This is useful to avoid runtime calculations when using the library.

import { writeFile, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const constantsPath = join(__dirname, '../dist/constants.js');

async function generatePrecomputedConstants() {
    try {
        const { DEFAULT_PRIVATE_COLORS, DEFAULT_THEME_UTILITY_COLORS } = await import('../dist/constants.js');

        const constantsContent = await readFile(constantsPath, 'utf8');

        const replacements = {
            'DEFAULT_PRIVATE_COLORS': JSON.stringify(DEFAULT_PRIVATE_COLORS, null, 2),
            'DEFAULT_THEME_UTILITY_COLORS': JSON.stringify(DEFAULT_THEME_UTILITY_COLORS, null, 2),
        };

        let newConstantsContent = constantsContent;

        // Apply all replacements
        Object.entries(replacements).forEach(([searchValue, replaceValue]) => {
            // Find specific variable declaration and replace all its definition
            const regex = new RegExp(
                `(const\\s+${searchValue}\\s*=\\s*)[^;]+;`,
                'g'
            );

            newConstantsContent = newConstantsContent.replace(
                regex,
                `$1${replaceValue};`
            );
        });

        // Replace original file with version with precomputed values
        await writeFile(constantsPath, newConstantsContent, 'utf8');

        console.log('✅ File dist/constants.js replaced with version with precomputed values');
    } catch (error) {
        console.error('❌ Error generating constants:', error);
        console.error('💡 Make sure the project is compiled: npm run build');
        process.exit(1);
    }
}

generatePrecomputedConstants();
