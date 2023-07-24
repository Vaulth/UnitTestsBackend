require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Stamp API', () => {
  it('should return the number 7 in the response when accessing /stamp/date/072023', async () => {
    const response = await request.get('/stamp/date/052023');
    expect(response.status).toBe(200);

    const responseData = parseInt(response.text);
    expect(responseData).toBe(7);
  });
});