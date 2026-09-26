const request = require('supertest');
const app = require('../app');

const BASE = '/api/inventory';

describe('inventory endpoints', () => {
  test('GET /api/inventory returns the list', async () => {
    const res = await request(app).get(BASE);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET inventory');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/inventory/:id uses the route param', async () => {
    const res = await request(app).get(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET inventory by id');
    expect(res.body.data.id).toBe('10');
  });

  test('POST /api/inventory returns 201 with the sent data', async () => {
    const res = await request(app).post(BASE).send({ stock: 40 });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Inventory created');
    expect(res.body.data).toEqual({ stock: 40 });
  });

  test('PUT /api/inventory/:id returns the updated data', async () => {
    const res = await request(app).put(`${BASE}/10`).send({ stock: 40 });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Inventory updated');
    expect(res.body.data).toEqual({ id: '10', ...{ stock: 40 } });
  });

  test('DELETE /api/inventory/:id returns the deleted id', async () => {
    const res = await request(app).delete(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Inventory deleted');
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
