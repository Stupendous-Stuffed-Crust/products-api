const axios = require('axios');

const API = 'http://localhost:3001';

describe('Integration Testing', () => {
  test('GET /products', async () => {
    const response = await axios.get(`${API}/products`);
    expect(response.status).toBe(200);
    expect(response.data).toBeTruthy();
    expect(response.data.length).toBe(5);
  });
  test('GET /products/:product_id', async () => {
    const response = await axios.get(`${API}/products/1`);
    expect(response.status).toBe(200);
    expect(response.data).toBeTruthy();
    expect(typeof response.data).toBe('object');
    expect(response.data.id).toBe(1);
    expect(response.data.features.length).toBe(2);
  });
  test('GET /products/:product_id/related', async () => {
    const response = await axios.get(`${API}/products/1/related`);
    expect(response.status).toBe(200);
    expect(response.data).toBeTruthy();
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBe(4);
  });
  test('GET /products/:product_id/styles', async () => {
    const response = await axios.get(`${API}/products/1000000/styles`);
    expect(response.status).toBe(200);
    expect(response.data).toBeTruthy();
    expect(response.data.product_id).toBe('1000000');
    expect(response.data.results.length).toBe(3);
  });
});
