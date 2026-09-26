const request = require('supertest');
const app = require('../app');

const BASE = '/api/roles';

describe('roles endpoints', () => {
  test('GET /api/roles returns the list', async () => {
    const res = await request(app).get(BASE);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET roles');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/roles/:id uses the route param', async () => {
    const res = await request(app).get(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET role by id');
    expect(res.body.data.id).toBe('10');
  });

  test('POST /api/roles returns 201 with the sent data', async () => {
    const res = await request(app).post(BASE).send({ name: 'admin' });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Role created');
    expect(res.body.data).toEqual({ name: 'admin' });
  });

  test('PUT /api/roles/:id returns the updated data', async () => {
    const res = await request(app).put(`${BASE}/10`).send({ name: 'admin' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Role updated');
    expect(res.body.data).toEqual({ id: '10', ...{ name: 'admin' } });
  });

  test('DELETE /api/roles/:id returns the deleted id', async () => {
    const res = await request(app).delete(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Role deleted');
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
