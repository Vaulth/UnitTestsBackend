require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Certificate API', () => {
  it('should return a number when accessing /certificate', async () => {
    const response = await request.get('/certificate');
    expect(response.status).toBe(200);

    const data = parseInt(response.text);
    expect(data).not.toBeNaN();
  });

  it('should return a different number on 10 each request to /certificate', async () => {
    const numRequests = 10; // Change this to the desired number of requests

    for (let i = 0; i < numRequests; i++) {
      const response = await request.get('/certificate');
      expect(response.status).toBe(200);

      const data = parseInt(response.text);
      expect(data).not.toBeNaN();
    }
  });

  it('should return a 404 status code for POST requests to /certificate', async () => {
    const response = await request.post('/certificate');
    expect(response.status).toBe(404);
  });

  it('should return a 404 status code for DELETE requests to /certificate', async () => {
    const response = await request.delete('/certificate');
    expect(response.status).toBe(404);
  });

});