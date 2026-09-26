const request = require('supertest');
const app = require('../app');

const BASE = '/api/orders';

describe('orders endpoints', () => {
  test('GET /api/orders returns the list', async () => {
    const res = await request(app).get(BASE);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET orders');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/orders/:id uses the route param', async () => {
    const res = await request(app).get(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET order by id');
    expect(res.body.data.id).toBe('10');
  });

  test('POST /api/orders returns 201 with the sent data', async () => {
    const res = await request(app).post(BASE).send({ paymentMethod: 'card' });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Order created');
    expect(res.body.data).toEqual({ paymentMethod: 'card' });
  });

  test('PUT /api/orders/:id returns the updated data', async () => {
    const res = await request(app).put(`${BASE}/10`).send({ paymentMethod: 'card' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Order updated');
    expect(res.body.data).toEqual({ id: '10', ...{ paymentMethod: 'card' } });
  });

  test('DELETE /api/orders/:id returns the deleted id', async () => {
    const res = await request(app).delete(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Order deleted');
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
