import {cloneDeep} from 'lodash-es';
import {DEFAULT_THEME} from '../../constants.js';
import {generateCSS} from '../generate.js';
import {
    updateUtilityColor,
    updateBaseColor,
    createInternalPrivateColorReference,
    createInternalUtilityColorReference,
} from '../../utils.js';

describe('generateCSS', () => {
    it('generate full theme', async () => {
        const result = generateCSS({theme: DEFAULT_THEME});
        expect(result).toMatchSnapshot();
    });

    it('generate only changed variables', async () => {
        const newTheme = cloneDeep(DEFAULT_THEME);
        newTheme.typography.variants['body-1']['font-size'] = '200px';
        newTheme.utilityColors['text-link-hover'] = {
            light: {
                value: 'red',
            },
            dark: {
                value: 'blue',
            },
        };
        const result = generateCSS({theme: newTheme, ignoreDefaultValues: true});
        expect(result).toMatchSnapshot();
    });

    it('generate when add new base color', async () => {
        let newTheme = cloneDeep(DEFAULT_THEME);
        newTheme = updateBaseColor({
            theme: newTheme,
            colorToken: 'brand',
            themeVariant: 'light',
            value: 'rgb(233, 233, 233)',
        });

        newTheme = updateBaseColor({
            theme: newTheme,
            colorToken: 'custom',
            value: {
                light: 'rgb(255,255,255)',
                dark: 'rgb(253,255,23)',
            },
        });
        const result = generateCSS({theme: newTheme, ignoreDefaultValues: true});
        expect(result).toMatchSnapshot();
    });

    it('generate when set reference in utility colors', async () => {
        let newTheme = cloneDeep(DEFAULT_THEME);
        newTheme = updateUtilityColor({
            theme: newTheme,
            colorToken: 'text-link-hover',
            themeVariant: 'light',
            value: createInternalPrivateColorReference('red', '500-solid'),
        });

        newTheme = updateUtilityColor({
            theme: newTheme,
            colorToken: 'base-float-medium',
            themeVariant: 'dark',
            value: createInternalUtilityColorReference('base-background'),
        });

        const result = generateCSS({theme: newTheme, ignoreDefaultValues: true});
        expect(result).toMatchSnapshot();
    });
});
