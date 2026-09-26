const request = require('supertest');
const app = require('../app');

describe('app', () => {
  test('GET /health returns status UP', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'UP' });
  });

  test('unknown routes return 404', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message');
  });

  test('malformed JSON returns 400', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Content-Type', 'application/json')
      .send('{"name": ');
    expect(res.status).toBe(400);
  });
});
