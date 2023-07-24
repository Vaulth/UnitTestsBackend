require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Stamp API', () => {
  it('should return the expected response when accessing /stamp/search/RPN', async () => {
    const expectedResponse = [
      "24249341630105029537336434116738455159232435097808947543565380007505991328811"
    ];

    const response = await request.get('/stamp/search/RPN');
    expect(response.status).toBe(200);

    const responseData = JSON.parse(response.text);
    expect(responseData).toEqual(expectedResponse);
  });
});