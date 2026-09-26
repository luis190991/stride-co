const request = require('supertest');
const app = require('../app');

const BASE = '/api/permissions';

describe('permissions endpoints', () => {
  test('GET /api/permissions returns the list', async () => {
    const res = await request(app).get(BASE);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET permissions');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/permissions/:id uses the route param', async () => {
    const res = await request(app).get(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('GET permission by id');
    expect(res.body.data.id).toBe('10');
  });

  test('POST /api/permissions returns 201 with the sent data', async () => {
    const res = await request(app).post(BASE).send({ key: 'users:manage' });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Permission created');
    expect(res.body.data).toEqual({ key: 'users:manage' });
  });

  test('PUT /api/permissions/:id returns the updated data', async () => {
    const res = await request(app).put(`${BASE}/10`).send({ key: 'users:manage' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Permission updated');
    expect(res.body.data).toEqual({ id: '10', ...{ key: 'users:manage' } });
  });

  test('DELETE /api/permissions/:id returns the deleted id', async () => {
    const res = await request(app).delete(`${BASE}/10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Permission deleted');
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
