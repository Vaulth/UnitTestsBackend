require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Stamp API', () => {
  it('should return the specified number of objects in the response', async () => {
    const response = await request.get('/stamp/latest/3'); // Change to the desired count
    expect(response.status).toBe(200);
  
    const responseData = JSON.parse(response.text);
    expect(Array.isArray(responseData)).toBe(true);
    expect(responseData.length).toBe(3); // Change to the expected count
  });

  // it('should handle negative count and return appropriate status', async () => {
  //   const response = await request.get('/stamp/latest/-1');
  //   expect(response.status).toBe(/* /!\  Le test n'ai pas gérais dans l'api il y a une erreur*/);
  // });

  it('should handle zero count and return appropriate status', async () => {
    const response = await request.get('/stamp/latest/0');
    expect(response.status).toBe(200);

    const responseData = JSON.parse(response.text);
    expect(responseData).toStrictEqual([]);
  });

  it('should return objects with expected fields in the response', async () => {
    const count = 2; // Number of stamp to retrieve
    const response = await request.get(`/stamp/latest/${count}`);
    expect(response.status).toBe(200);
  
    const responseData = JSON.parse(response.text);
    expect(Array.isArray(responseData)).toBe(true);
  
    for (const certificate of responseData) {
      expect(certificate).toHaveProperty('blockNumber');
      expect(certificate).toHaveProperty('tokenId');
      expect(certificate).toHaveProperty('imgCid');
      expect(certificate).toHaveProperty('name');
      expect(certificate).toHaveProperty('description');
      expect(certificate).toHaveProperty('date');
    }
  });
});