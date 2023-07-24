require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Stamp API', () => {
  it('should return three objects in the response when accessing /stamp/latest/3', async () => {
    const response = await request.get('/stamp/latest/3');
    expect(response.status).toBe(200);

    const responseData = JSON.parse(response.text);
    expect(Array.isArray(responseData)).toBe(true);
    expect(responseData.length).toBe(3);
  });
});