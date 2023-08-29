require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Stamp API', () => {

  it('should handle future date and return expected response', async () => {
    const futureDate = '122025'; // Assuming December 2025
    const response = await request.get(`/stamp/date/${futureDate}`);
    expect(response.status).toBe(200);
  
    const responseData = parseInt(response.text);
    expect(responseData).toBe(0);
  });

  it('should handle invalid date and return appropriate status', async () => {
    const invalidDate = '999999'; // Invalid date
    const response = await request.get(`/stamp/date/${invalidDate}`);
    expect(response.status).toBe(200);

    const responseData = parseInt(response.text);
    expect(responseData).toBe(0);
  });

  it('should return the expected response for a valid date', async () => {
    const validDate = '052023'; // Assuming May 2023
    const response = await request.get(`/stamp/date/${validDate}`);
    expect(response.status).toBe(200);
  
    const responseData = parseInt(response.text);
    expect(responseData).toBe(7);
  });

  it('should handle multiple requests efficiently', async () => {
    const numRequests = 10; // Number of consecutive requests
    const validDate = '072023'; // Assuming July 2023
  
    for (let i = 0; i < numRequests; i++) {
      const response = await request.get(`/stamp/date/${validDate}`);
      expect(response.status).toBe(200);
      const responseData = parseInt(response.text);
      expect(responseData).toBe(3);
    }
  });
});