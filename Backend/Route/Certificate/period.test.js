require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Certificate API', () => {
  it('should return the number 4 in the response when accessing /certificate/period/9288824/9316266', async () => {
    const response = await request.get('/certificate/period/9288824/9316266');
    expect(response.status).toBe(200);

    const responseData = parseInt(response.text);
    expect(responseData).toBe(4);
  });
});