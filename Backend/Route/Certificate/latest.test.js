require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Certificate API', () => {
  it('should return two objects in the response when accessing /certificate/latest/3', async () => {
    const response = await request.get('/certificate/latest/2');
    expect(response.status).toBe(200);

    const responseData = JSON.parse(response.text);
    expect(Array.isArray(responseData)).toBe(true);
    expect(responseData.length).toBe(2);
  });
});