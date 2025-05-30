import {cloneDeep} from 'lodash-es';
import {DEFAULT_THEME} from '../../constants.js';
import {generateCSS} from '../generate.js';

describe('generateCSS', () => {
    it('generate full theme', async () => {
        const result = generateCSS({theme: DEFAULT_THEME});
        expect(result).toMatchSnapshot();
    });

    it('generate only changed variables', async () => {
        const newTheme = cloneDeep(DEFAULT_THEME);
        newTheme.typography.variants['body-1']['font-size'] = '200px';
        const result = generateCSS({theme: newTheme, ignoreDefaultValues: true});
        expect(result).toMatchSnapshot();
    });
});
