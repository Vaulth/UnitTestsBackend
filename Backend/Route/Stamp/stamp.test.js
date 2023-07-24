require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Stamp API', () => {
  it('should return a number when accessing /stamp', async () => {
    const response = await request.get('/stamp');
    expect(response.status).toBe(200);

    const data = parseInt(response.text);
    expect(data).not.toBeNaN();
  });
});