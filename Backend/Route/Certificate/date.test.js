require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Stamp API', () => {
  it('should return the number 30 in the response when accessing /certificate/date/052023', async () => {
    const response = await request.get('/certificate/date/052023');
    expect(response.status).toBe(200);

    const responseData = parseInt(response.text);
    expect(responseData).toBe(30);
  });
});