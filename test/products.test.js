const request = require('supertest');
const app = require('../app');

const BASE = '/api/products';

describe('products endpoints', () => {
  test('GET /api/products returns the list', async () => {
    const res = await request(app).get(BASE);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET products');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/products/:id uses the route param', async () => {
    const res = await request(app).get(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET product by id');
    expect(res.body.data.id).toBe('10');
  });

  test('POST /api/products returns 201 with the sent data', async () => {
    const res = await request(app).post(BASE).send({ name: 'Stride Runner', price: 1899 });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Product created');
    expect(res.body.data).toEqual({ name: 'Stride Runner', price: 1899 });
  });

  test('PUT /api/products/:id returns the updated data', async () => {
    const res = await request(app).put(`${BASE}/10`).send({ name: 'Stride Runner', price: 1899 });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Product updated');
    expect(res.body.data).toEqual({ id: '10', ...{ name: 'Stride Runner', price: 1899 } });
  });

  test('DELETE /api/products/:id returns the deleted id', async () => {
    const res = await request(app).delete(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Product deleted');
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
