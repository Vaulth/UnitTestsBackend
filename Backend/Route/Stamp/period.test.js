require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Stamp API', () => {
  it('should return the number 3 in the response when accessing /stamp/period/8980256/9288325', async () => {
    const response = await request.get('/stamp/period/8980256/9288325');
    expect(response.status).toBe(200);

    const responseData = parseInt(response.text);
    expect(responseData).toBe(3);
  });
});