require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Stamp API', () => {
  it('should return the number 1688468124 in the response when accessing /block/timestamp/9288325', async () => {
    const response = await request.get('/block/timestamp/9288325');
    expect(response.status).toBe(200);

    const responseData = parseInt(response.text);
    expect(responseData).toBe(1688468124);
  });
});