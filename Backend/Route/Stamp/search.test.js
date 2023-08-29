require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Stamp API', () => {
  it('should return the expected stamp for a valid keyword', async () => {
    const expectedResponse = [
      "24249341630105029537336434116738455159232435097808947543565380007505991328811"
    ];

    const response = await request.get('/stamp/search/RPN'); // Adjust the keyword
    expect(response.status).toBe(200);

    const responseData = JSON.parse(response.text);
    expect(responseData).toEqual(expectedResponse);
  });

  it('should return an empty array for a non-existing keyword', async () => {
    const response = await request.get('/stamp/search/notexist'); // Adjust the keyword
    expect(response.status).toBe(200);
  
    const responseData = JSON.parse(response.text);
    expect(Array.isArray(responseData)).toBe(true);
    expect(responseData.length).toBe(0);
  });

  it('should handle multiple requests efficiently', async () => {
    const numRequests = 10; // Number of consecutive requests
    const keyword = 'ball'; // Adjust the keyword
  
    for (let i = 0; i < numRequests; i++) {
      const response = await request.get(`/stamp/search/${keyword}`);
      expect(response.status).toBe(200);
    }
  });
});