const request = require('supertest');
const app = require('../server');

describe('API health check', () => {
  it('GET /health should return status OK', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'OK');
    expect(res.body).toHaveProperty('timestamp');
  });
});

