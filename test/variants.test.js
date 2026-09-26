const request = require('supertest');
const app = require('../app');

const BASE = '/api/variants';

describe('variants endpoints', () => {
  test('GET /api/variants returns the list', async () => {
    const res = await request(app).get(BASE);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET variants');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/variants/:id uses the route param', async () => {
    const res = await request(app).get(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET variant by id');
    expect(res.body.data.id).toBe('10');
  });

  test('POST /api/variants returns 201 with the sent data', async () => {
    const res = await request(app).post(BASE).send({ product_id: 1, sku: 'SR-26-BLK' });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Variant created');
    expect(res.body.data).toEqual({ product_id: 1, sku: 'SR-26-BLK' });
  });

  test('PUT /api/variants/:id returns the updated data', async () => {
    const res = await request(app).put(`${BASE}/10`).send({ product_id: 1, sku: 'SR-26-BLK' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Variant updated');
    expect(res.body.data).toEqual({ id: '10', ...{ product_id: 1, sku: 'SR-26-BLK' } });
  });

  test('DELETE /api/variants/:id returns the deleted id', async () => {
    const res = await request(app).delete(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Variant deleted');
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
