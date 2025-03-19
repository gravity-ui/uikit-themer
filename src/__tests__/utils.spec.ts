import {parsePrivateColorCssVariable} from '../utils.js';

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
