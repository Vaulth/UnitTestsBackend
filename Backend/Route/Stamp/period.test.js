describe('Stamp API', () => {
  it('should return the number 3 in the response when accessing /stamp/period/8980256/9288325', async () => {
    const response = await request.get('/stamp/period/8980256/9288325');
    expect(response.status).toBe(200);

    const responseData = parseInt(response.text);
    expect(responseData).toBe(3);
  });
});

require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Stamp API', () => {

  it('should return the expected number of stamp within the period', async () => {
    const start = 8980256; // Start of the period
    const end = 9288325; // End of the period
    const expectedStampCount = 3; // Adjust the expected count
  
    const response = await request.get(`/stamp/period/${start}/${end}`);
    expect(response.status).toBe(200);
  
    const responseData = parseInt(response.text);
    expect(responseData).toBe(expectedStampCount);
  });

  // it('should handle invalid dates and return appropriate status', async () => {
  //   const response = await request.get('/stamp/period/invalid/start/end'); // Use invalid dates
  //   expect(response.status).toBe(/* /!\ Attention cas non gérais par l'api à corriger */);
  // });

  it('should handle a large period efficiently', async () => {
    const numRequests = 10; // Number of consecutive requests
    const start = 8900000; // Start of the period
    const end = 9200000; // End of the period
  
    for (let i = 0; i < numRequests; i++) {
      const response = await request.get(`/stamp/period/${start}/${end}`);
      expect(response.status).toBe(200);
      const responseData = parseInt(response.text);
      expect(responseData).toBe(8);
    }
  });

  it('should return 0 when accessing a period with no stamp', async () => {
    const response = await request.get('/stamp/period/8500000/8600000'); // Adjust the period as needed
    expect(response.status).toBe(200);
  
    const responseData = parseInt(response.text);
    expect(responseData).toBe(0);
  });
});