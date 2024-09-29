export const configServiceMock = {
    get: jest.fn((key: string) => {
        if (key === 'A_CLIENTID') return 'client_id_value';
        if (key === 'A_SECRET') return 'client_secret_value';
        if (key === 'A_DOMAIN') return 'https://example.com/';
    }),
}