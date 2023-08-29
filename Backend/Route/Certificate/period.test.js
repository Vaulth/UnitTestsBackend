require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Certificate API', () => {

  it('should return the expected number of certificates within the period', async () => {
    const start = 9288824; // Start of the period
    const end = 9316266; // End of the period
    const expectedCertificatesCount = 4; // Adjust the expected count
  
    const response = await request.get(`/certificate/period/${start}/${end}`);
    expect(response.status).toBe(200);
  
    const responseData = parseInt(response.text);
    expect(responseData).toBe(expectedCertificatesCount);
  });

  // it('should handle invalid dates and return appropriate status', async () => {
  //   const response = await request.get('/certificate/period/invalid/start/end'); // Use invalid dates
  //   expect(response.status).toBe(/* /!\ Attention cas non gérais par l'api à corriger */);
  // });

  it('should handle a large period efficiently', async () => {
    const numRequests = 10; // Number of consecutive requests
    const start = 9200000; // Start of the period
    const end = 9300000; // End of the period
  
    for (let i = 0; i < numRequests; i++) {
      const response = await request.get(`/certificate/period/${start}/${end}`);
      expect(response.status).toBe(200);
      const responseData = parseInt(response.text);
      expect(responseData).toBe(4);
    }
  });

  it('should return 0 when accessing a period with no certificates', async () => {
    const response = await request.get('/certificate/period/8500000/8600000'); // Adjust the period as needed
    expect(response.status).toBe(200);
  
    const responseData = parseInt(response.text);
    expect(responseData).toBe(0);
  });
});