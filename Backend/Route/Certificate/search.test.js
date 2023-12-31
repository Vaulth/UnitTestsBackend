require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`${process.env.URL}`);

describe('Certificate API', () => {

  it('should return the expected certificates for a valid keyword', async () => {
    const expectedResponse = [
      "103222528964093923500771833817013765757678203192145334505651387012305835875981",
      "104507000768863628290986433813955576751941785426117482070979279016304584881455",
      "24598498372352487104787462298330257978049356743245341301273631740370801070679",
      "27781159100047561170120858756224815387448453151491183606761937329841239051039",
      "33788569776261407258440482288774511260370827318288072984276611455186704574277",
      "42240868544085850006082542578312687751414195886403334681002412923560601986775",
      "56002605179409608071176715716142417272431922630803920648388590181915233738728",
      "74387760410182334559763475327974751461141980360988347374998434887502643813614"
    ]; // Expected response, adjust if you change kayword
  
    const response = await request.get('/certificate/search/ball'); // Adjust the keyword
    expect(response.status).toBe(200);
  
    const responseData = JSON.parse(response.text);
    expect(responseData).toEqual(expectedResponse);
  });

  it('should return an empty array for a non-existing keyword', async () => {
    const response = await request.get('/certificate/search/notexist'); // Adjust the keyword
    expect(response.status).toBe(200);
  
    const responseData = JSON.parse(response.text);
    expect(Array.isArray(responseData)).toBe(true);
    expect(responseData.length).toBe(0);
  });

  it('should handle multiple requests efficiently', async () => {
    const numRequests = 10; // Number of consecutive requests
    const keyword = 'ball'; // Adjust the keyword
  
    for (let i = 0; i < numRequests; i++) {
      const response = await request.get(`/certificate/search/${keyword}`);
      expect(response.status).toBe(200);
    }
  });
});