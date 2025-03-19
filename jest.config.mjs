/** @type {import('jest').Config} */
export default {
    preset: 'ts-jest/presets/default-esm', // Using ESM
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'], // Explicitly specify that TS files are ESM
    transform: {},
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
};
