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

    it('utility colors with private references', async () => {
        const result = parseJSON({
            '--g-color-private-brand-200': {
                dark: {
                    value: 'rgba(203,255,92,0.1)',
                },
                light: {
                    value: 'rgba(203,255,92,0.1)',
                },
            },
            '--g-color-private-brand-50': {
                dark: {
                    value: 'rgba(11,20,33,0.1)',
                },
                light: {
                    value: 'rgba(11,20,33,0.1)',
                },
            },
            '--g-color-base-brand-hover': {
                dark: {
                    value: 'rgba(11,20,33,0.1)',
                    ref: '--g-color-private-brand-50',
                },
                light: {
                    value: 'rgba(203,255,92,0.1)',
                    ref: '--g-color-private-brand-200',
                },
            },
        });

        expect(result.utilityColors['base-brand-hover']).toEqual({
            dark: {
                ref: 'private.brand.50',
                value: 'rgba(11,20,33,0.1)',
            },
            light: {
                ref: 'private.brand.200',
                value: 'rgba(203,255,92,0.1)',
            },
        });
    });

    it('utility colors with utility references', async () => {
        const result = parseJSON({
            '--g-color-private-blue-600-solid': {
                dark: {
                    value: 'rgb(54, 151, 241)',
                },
                light: {
                    value: 'rgb(52, 139, 220)',
                },
            },
            '--g-color-private-blue-550-solid': {
                dark: {
                    value: 'rgb(54, 151, 241)',
                },
                light: {
                    value: 'rgb(52, 139, 220)',
                },
            },
            '--g-color-text-info': {
                dark: {
                    value: '--g-color-private-blue-550-solid',
                },
                light: {
                    value: '--g-color-private-blue-600-solid',
                },
            },
            '--g-color-text-primary': {
                dark: {
                    value: 'rgb(54, 151, 241)',
                    ref: '--g-color-text-info',
                },
                light: {
                    value: 'rgb(52, 139, 220)',
                    ref: '--g-color-text-info',
                },
            },
        });

        expect(result.utilityColors['text-primary']).toEqual({
            light: {
                ref: 'utility.text-info',
                value: 'rgb(52, 139, 220)',
            },
            dark: {
                ref: 'utility.text-info',
                value: 'rgb(54, 151, 241)',
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

    it('illustrations colors', async () => {
        const result = parseJSON({
            '--gil-color-object-base': {
                dark: {
                    value: 'rgb(143, 82, 201)',
                },
                light: {
                    value: 'rgb(82, 130, 251)',
                },
            },
        });

        expect(result.libraries?.illustrations?.['object-base']).toEqual({
            dark: {
                value: 'rgb(143, 82, 201)',
            },
            light: {
                value: 'rgb(82, 130, 251)',
            },
        });
    });
});
