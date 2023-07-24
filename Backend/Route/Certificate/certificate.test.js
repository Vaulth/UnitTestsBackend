require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Certificate API', () => {
  it('should return a number when accessing /certificate', async () => {
    const response = await request.get('/certificate');
    expect(response.status).toBe(200);

    const data = parseInt(response.text);
    expect(data).not.toBeNaN();
  });
});