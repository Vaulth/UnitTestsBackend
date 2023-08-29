require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Stamp API', () => {
  it('should return a number when accessing /stamp', async () => {
    const response = await request.get('/stamp');
    expect(response.status).toBe(200);

    const data = parseInt(response.text);
    expect(data).not.toBeNaN();
  });

  it('should return a different number on each request to /stamp', async () => {
    const numRequests = 10; // Change this to the desired number of requests

    for (let i = 0; i < numRequests; i++) {
      const response = await request.get('/stamp');
      expect(response.status).toBe(200);

      const stamp = parseInt(response.text);
      expect(stamp).not.toBeNaN();
    }
  });

  it('should return a 404 status code for POST requests to /stamp', async () => {
    const response = await request.post('/stamp');
    expect(response.status).toBe(404);
  });

  it('should return a 404 status code for DELETE requests to /stamp', async () => {
    const response = await request.delete('/stamp');
    expect(response.status).toBe(404);
  });
});