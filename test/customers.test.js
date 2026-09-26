const request = require('supertest');
const app = require('../app');

const BASE = '/api/customers';

describe('customers endpoints', () => {
  test('GET /api/customers returns the list', async () => {
    const res = await request(app).get(BASE);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET customers');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/customers/:id uses the route param', async () => {
    const res = await request(app).get(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET customer by id');
    expect(res.body.data.id).toBe('10');
  });

  test('POST /api/customers returns 201 with the sent data', async () => {
    const res = await request(app).post(BASE).send({ email: 'maria@example.com' });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Customer created');
    expect(res.body.data).toEqual({ email: 'maria@example.com' });
  });

  test('PUT /api/customers/:id returns the updated data', async () => {
    const res = await request(app).put(`${BASE}/10`).send({ email: 'maria@example.com' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Customer updated');
    expect(res.body.data).toEqual({ id: '10', ...{ email: 'maria@example.com' } });
  });

  test('DELETE /api/customers/:id returns the deleted id', async () => {
    const res = await request(app).delete(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Customer deleted');
    expect(res.body.data.id).toBe('10');
  });

  test('unknown sub-route returns 404', async () => {
    const res = await request(app).get(`${BASE}/10/unknown`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message');
  });

  test('POST with malformed JSON returns 400', async () => {
    const res = await request(app)
      .post(BASE)
      .set('Content-Type', 'application/json')
      .send('{"invalid": ');
    expect(res.status).toBe(400);
  });
});
