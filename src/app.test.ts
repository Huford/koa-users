import request from 'supertest';
import app from './app';

describe('routes', () => {
  describe('/', () => {
    it('root route returns 404', async () => {
      const response = await request(app.callback()).get('/');
      expect(response.status).toBe(404);
    });
  });
  describe('/user', () => {
    it('returns unauthorized if no token is provided', async () => {
      const response = await request(app.callback()).get('/users');
      expect(response.status).toBe(401);
    });

    it('returns all users if token is present', async () => {
      const response = await await request(app.callback())
        .get('/users')
        .set('Accept', 'application/json')
        .set('X-Bundle-Access-Token', 'token');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(10);
    });

    it('returns empty array if no users meet the filter', async () => {
      const response = await await request(app.callback())
        .get('/users?emailContains=12dsa1123')
        .set('Accept', 'application/json')
        .set('X-Bundle-Access-Token', 'token');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
    });
  });
});
