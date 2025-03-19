import {parseJSON} from '../parse.js';

describe('parseJSON', () => {
    it('utility colors', async () => {
        const result = parseJSON({
            '--g-color-text-brand-heavy': {
                dark: {
                    value: 'rgb(0, 0, 0)',
                },
                light: {
                    value: 'rgb(255, 119, 0)',
                },
            },
            '--g-color-text-link-visited-hover': {
                dark: {
                    value: 'rgb(143, 82, 204)',
                },
                light: {
                    value: 'rgb(82, 130, 255)',
                },
            },
        });

        expect(result.utilityColors['text-brand-heavy']).toEqual({
            dark: {
                value: 'rgb(0, 0, 0)',
            },
            light: {
                value: 'rgb(255, 119, 0)',
            },
        });

        expect(result.utilityColors['text-link-visited-hover']).toEqual({
            dark: {
                value: 'rgb(143, 82, 204)',
            },
            light: {
                value: 'rgb(82, 130, 255)',
            },
        });
    });

    it('private colors', async () => {
        const result = parseJSON({
            '--g-color-private-white-50': {
                dark: {
                    value: 'rgb(0, 0, 0)',
                },
                light: {
                    value: 'rgba(255, 255, 255, 0.05)',
                },
            },
            '--g-color-private-green-200-solid': {
                dark: {
                    value: 'rgb(143, 82, 204)',
                },
                light: {
                    value: 'rgb(82, 130, 255)',
                },
            },
        });

        expect(result.privateColors['white']!.light[50]).toEqual({
            value: 'rgba(255, 255, 255, 0.05)',
        });

        expect(result.privateColors['white']!.dark[50]).toEqual({
            value: 'rgb(0, 0, 0)',
        });

        expect(result.privateColors['green']!.light['200-solid']).toEqual({
            value: 'rgb(82, 130, 255)',
        });

        expect(result.privateColors['green']!.dark['200-solid']).toEqual({
            value: 'rgb(143, 82, 204)',
        });
    });
});
