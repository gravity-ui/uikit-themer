import {parseTextCssVariable} from '../utils.js';

describe('parseTextCssVariable', () => {
    it('group font weight', () => {
        expect(parseTextCssVariable('--g-text-header-font-weight')).toEqual({
            group: 'header',
            property: 'font-weight',
        });
    });

    it('group font family', () => {
        expect(parseTextCssVariable('--g-text-code-font-family')).toEqual({
            group: 'code',
            property: 'font-family',
        });
    });

    it('invalid group property', () => {
        expect(parseTextCssVariable('--g-text-header-font-super')).toEqual(undefined);
    });

    it('invalid group', () => {
        expect(parseTextCssVariable('--g-text-codium-font-family')).toEqual(undefined);
    });

    it('variant font size', () => {
        expect(parseTextCssVariable('--g-text-body-1-font-size')).toEqual({
            group: 'body',
            variant: 'body-1',
            property: 'font-size',
        });
    });

    it('variant line height', () => {
        expect(parseTextCssVariable('--g-text-header-1-line-height')).toEqual({
            group: 'header',
            variant: 'header-1',
            property: 'line-height',
        });
    });

    it('invalid variant', () => {
        expect(parseTextCssVariable('--g-text-header-55-line-height')).toEqual(undefined);
    });
});
