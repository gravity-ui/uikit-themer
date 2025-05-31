import {parsePrivateColorCssVariable, updateBaseColor} from '../utils.js';
import {DEFAULT_THEME} from '../constants.js';
import {cloneDeep} from 'lodash-es';

describe('parsePrivateColorCssVariable', () => {
    it('white-opaque-150', () => {
        expect(parsePrivateColorCssVariable('--g-color-private-white-opaque-150')).toEqual({
            mainColorToken: 'white',
            privateColorToken: 'opaque-150',
        });
    });

    it('cool-grey solid', () => {
        expect(parsePrivateColorCssVariable('--g-color-private-cool-grey-200-solid')).toEqual({
            mainColorToken: 'cool-grey',
            privateColorToken: '200-solid',
        });
    });

    it('cool-grey non solid', () => {
        expect(parsePrivateColorCssVariable('--g-color-private-cool-grey-200')).toEqual({
            mainColorToken: 'cool-grey',
            privateColorToken: '200',
        });
    });

    it('red non solid', () => {
        expect(parsePrivateColorCssVariable('--g-color-private-red-500')).toEqual({
            mainColorToken: 'red',
            privateColorToken: '500',
        });
    });

    it('red solid', () => {
        expect(parsePrivateColorCssVariable('--g-color-private-red-550-solid')).toEqual({
            mainColorToken: 'red',
            privateColorToken: '550-solid',
        });
    });

    it('color with multiple dashes and solid', () => {
        expect(
            parsePrivateColorCssVariable('--g-color-private-super-custom-red-500-solid'),
        ).toEqual({
            mainColorToken: 'super-custom-red',
            privateColorToken: '500-solid',
        });
    });

    it('color with multiple dashes and non solid', () => {
        expect(parsePrivateColorCssVariable('--g-color-private-super-custom-red-500')).toEqual({
            mainColorToken: 'super-custom-red',
            privateColorToken: '500',
        });
    });

    it('throw exception for wrong token', () => {
        expect(() => {
            parsePrivateColorCssVariable('--g-color-private-red-123');
        }).toThrow('Invalid CSS variable format');
    });
});

describe('updateBaseColor', () => {
    describe('updating single theme variant', () => {
        it('should update base color for light theme', () => {
            const newColor = 'rgb(255, 0, 0)';

            const result = updateBaseColor({
                theme: DEFAULT_THEME,
                colorToken: 'brand',
                themeVariant: 'light',
                value: newColor,
            });

            expect(result.baseColors.brand.light.value).toBe(newColor);
            expect(result.baseColors.brand.dark.value).toBe('');

            // Check that private colors are regenerated for light theme
            expect(result.privateColors.brand).toBeDefined();
            expect(Object.keys(result.privateColors.brand.light).length).toBeGreaterThan(0);

            // Check that private colors for dark theme remain unchanged
            expect(result.privateColors.brand.dark).toEqual({});
        });

        it('should update base color for dark theme', () => {
            const newColor = 'rgb(0, 255, 0)';

            const result = updateBaseColor({
                theme: DEFAULT_THEME,
                colorToken: 'brand',
                themeVariant: 'dark',
                value: newColor,
            });

            expect(result.baseColors.brand.dark.value).toBe(newColor);
            expect(result.baseColors.brand.light.value).toBe('');

            // Check that private colors are regenerated for dark theme
            expect(result.privateColors.brand).toBeDefined();
            expect(Object.keys(result.privateColors.brand.dark).length).toBeGreaterThan(0);

            // Check that private colors for light theme remain unchanged
            expect(result.privateColors.brand.light).toEqual({});
        });
    });

    describe('updating both theme variants', () => {
        it('should update base color for both themes simultaneously', () => {
            const newColors = {
                light: 'rgb(255, 100, 100)',
                dark: 'rgb(200, 50, 50)',
            };

            const result = updateBaseColor({
                theme: DEFAULT_THEME,
                colorToken: 'brand',
                value: newColors,
            });

            expect(result.baseColors.brand.light.value).toBe(newColors.light);
            expect(result.baseColors.brand.dark.value).toBe(newColors.dark);

            // Check that private colors are regenerated for both themes
            expect(result.privateColors.brand.light).toBeDefined();
            expect(result.privateColors.brand.dark).toBeDefined();
            expect(Object.keys(result.privateColors.brand.light).length).toBeGreaterThan(0);
            expect(Object.keys(result.privateColors.brand.dark).length).toBeGreaterThan(0);
        });
    });

    describe('working with new color tokens', () => {
        it('should create new color token if it does not exist', () => {
            const newColor = 'rgb(128, 128, 128)';

            const result = updateBaseColor({
                theme: DEFAULT_THEME,
                colorToken: 'custom-color',
                themeVariant: 'light',
                value: newColor,
            });

            expect(result.baseColors['custom-color']).toBeDefined();
            expect(result.baseColors['custom-color'].light.value).toBe(newColor);
            expect(result.baseColors['custom-color'].dark.value).toBe('');

            // Check that private colors are created for new token
            expect(result.privateColors['custom-color']).toBeDefined();
            expect(result.privateColors['custom-color'].light).toBeDefined();
            expect(Object.keys(result.privateColors['custom-color'].light).length).toBeGreaterThan(
                0,
            );
        });

        it('should create new color token for both themes', () => {
            const newColors = {
                light: 'rgb(100, 150, 200)',
                dark: 'rgb(80, 120, 160)',
            };

            const result = updateBaseColor({
                theme: DEFAULT_THEME,
                colorToken: 'custom-blue',
                value: newColors,
            });

            expect(result.baseColors['custom-blue']).toBeDefined();
            expect(result.baseColors['custom-blue'].light.value).toBe(newColors.light);
            expect(result.baseColors['custom-blue'].dark.value).toBe(newColors.dark);

            // Check that private colors are created for both themes
            expect(result.privateColors['custom-blue'].light).toBeDefined();
            expect(result.privateColors['custom-blue'].dark).toBeDefined();
            expect(Object.keys(result.privateColors['custom-blue'].light).length).toBeGreaterThan(
                0,
            );
            expect(Object.keys(result.privateColors['custom-blue'].dark).length).toBeGreaterThan(0);
        });
    });

    describe('immutability of original theme', () => {
        it('should not modify the original theme', () => {
            const originalTheme = cloneDeep(DEFAULT_THEME);
            const newColor = 'rgb(255, 255, 0)';

            const result = updateBaseColor({
                theme: DEFAULT_THEME,
                colorToken: 'brand',
                themeVariant: 'light',
                value: newColor,
            });

            // Check that original theme is not modified
            expect(DEFAULT_THEME).toEqual(originalTheme);
            expect(result).not.toBe(DEFAULT_THEME);
            expect(result.baseColors.brand.light.value).not.toBe('');
        });
    });

    describe('handling existing tokens with empty values', () => {
        it('should properly handle theme with empty private colors', () => {
            const themeWithEmptyPrivateColors = cloneDeep(DEFAULT_THEME);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            themeWithEmptyPrivateColors.privateColors.brand = undefined as any;

            const newColor = 'rgb(50, 150, 250)';

            const result = updateBaseColor({
                theme: themeWithEmptyPrivateColors,
                colorToken: 'brand',
                themeVariant: 'light',
                value: newColor,
            });

            expect(result.baseColors.brand.light.value).toBe(newColor);
            expect(result.privateColors.brand).toBeDefined();
            expect(result.privateColors.brand.light).toBeDefined();
            expect(Object.keys(result.privateColors.brand.light).length).toBeGreaterThan(0);
        });
    });

    describe('correctness of private colors regeneration', () => {
        it('should use background colors from utilityColors for private colors generation', () => {
            const customTheme = cloneDeep(DEFAULT_THEME);
            customTheme.utilityColors['base-background'] = {
                light: {value: 'rgb(240, 240, 240)'},
                dark: {value: 'rgb(20, 20, 20)'},
            };

            const newColor = 'rgb(255, 100, 50)';

            const result = updateBaseColor({
                theme: customTheme,
                colorToken: 'orange',
                themeVariant: 'light',
                value: newColor,
            });

            expect(result.baseColors.orange.light.value).toBe(newColor);
            // Private colors should be regenerated with custom background taken into account
            expect(result.privateColors.orange.light).toBeDefined();
            expect(Object.keys(result.privateColors.orange.light).length).toBeGreaterThan(0);
        });
    });
});
