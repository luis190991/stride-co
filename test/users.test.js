const request = require('supertest');
const app = require('../app');

const BASE = '/api/users';

describe('users endpoints', () => {
  test('GET /api/users returns the list', async () => {
    const res = await request(app).get(BASE);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET users');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/users/:id uses the route param', async () => {
    const res = await request(app).get(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET user by id');
    expect(res.body.data.id).toBe('10');
  });

  test('POST /api/users returns 201 with the sent data', async () => {
    const res = await request(app).post(BASE).send({ first_name: 'Ana', email: 'ana@strideco.mx' });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User created');
    expect(res.body.data).toEqual({ first_name: 'Ana', email: 'ana@strideco.mx' });
  });

  test('PUT /api/users/:id returns the updated data', async () => {
    const res = await request(app).put(`${BASE}/10`).send({ first_name: 'Ana', email: 'ana@strideco.mx' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User updated');
    expect(res.body.data).toEqual({ id: '10', ...{ first_name: 'Ana', email: 'ana@strideco.mx' } });
  });

  test('DELETE /api/users/:id returns the deleted id', async () => {
    const res = await request(app).delete(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User deleted');
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
