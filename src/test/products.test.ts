import supertest, { SuperAgentTest } from 'supertest';
import Server from '../services/server';
import productsRouter from '../routes/productsRouter';

describe('Api products', () => {

    let request: SuperAgentTest;

    beforeAll( async () => {
        request = supertest.agent(Server);
    })

    test('Should responde with an array and status 200', async () => {
        const response = await request.get('/api/products');

        expect(response.body).toBeInstanceOf(Array);
        expect(response.status).toBe(200);
    })
})