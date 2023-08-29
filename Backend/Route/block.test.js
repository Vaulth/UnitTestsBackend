require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Block API', () => {
  it('should return the number 1688468124 in the response when accessing /block/timestamp/9288325', async () => {
    const response = await request.get('/block/timestamp/9288325');
    expect(response.status).toBe(200);

    const responseData = parseInt(response.text);
    expect(responseData).toBe(1688468124);
  });

  it('should return the expected response for a different blockNumber', async () => {
    const blockNumber = 9102833; // Adjust the timestamp
    const expectedResponse = 1685620836;
  
    const response = await request.get(`/block/timestamp/${blockNumber}`);
    expect(response.status).toBe(200);
  
    const responseData = parseInt(response.text);
    expect(responseData).toBe(expectedResponse);
  });

  it('should handle invalid blockNumber and return appropriate status', async () => {
    const response = await request.get('/block/timestamp/invalid'); // Invalid timestamp
    expect(response.status).toBe(200); // Il doit y avoir un code d'erreur spécifique ? Ou c'est normal ?
  });

  it('should handle multiple requests efficiently', async () => {
    const numRequests = 10; // Number of consecutive requests
    const blockNumber = 9288325; // Adjust the blockNumber
  
    for (let i = 0; i < numRequests; i++) {
      const response = await request.get(`/block/timestamp/${blockNumber}`);
      expect(response.status).toBe(200);
      const responseData = parseInt(response.text);
    }
  });
});