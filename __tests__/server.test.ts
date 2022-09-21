import supertest from 'supertest';
import { createServer } from '@config/express';

describe('Server', () => {
  it('should return 404', async () => {
    const app = await createServer();
    const response = await supertest(app).get('/not-found');
    expect(response.status).toBe(404);
  });
});
