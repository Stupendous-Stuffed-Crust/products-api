require('dotenv').config();
const models = require('../models');
const controllers = require('../controllers');

jest.mock('../models');

const mockReq = { query: {}, params: {} };
const mockRes = {
  json(results) {
    this.answer = results;
  },
  sendStatus(statusCode) {
    this.statusCode = statusCode;
  },
};

afterEach(() => {
  mockRes.answer = undefined;
  mockRes.statusCode = undefined;
  mockReq.query = {};
  mockReq.params = {};
});

describe('Controllers Methods', () => {
  test('getProducts', async () => {
    models.getProducts.mockResolvedValue('I have been called');
    await controllers.getProducts(mockReq, mockRes)
      .then(() => {
        expect(mockRes.answer).toBeTruthy();
        expect(mockRes.answer).toBe('I have been called');
        expect(models.getProducts).toHaveBeenCalled();
      });
  });
  test('getProduct catch error', async () => {
    models.getProducts.mockRejectedValue({ stack: 'THIS ERROR IS INTENTIONAL' });
    await controllers.getProducts(mockReq, mockRes)
      .then(() => {
        expect(mockRes.statusCode).toBe(500);
      });
  });
  test('getProductDetails', async () => {
    models.getProductDetails.mockResolvedValue('I have been called');
    mockReq.params.product_id = 1;
    await controllers.getProductDetails(mockReq, mockRes)
      .then(() => {
        expect(mockRes.answer).toBeTruthy();
        expect(mockRes.answer).toBe('I have been called');
        expect(models.getProductDetails).toHaveBeenCalled();
      });
  });
  test('getProductDetails catch error', async () => {
    models.getProductDetails.mockRejectedValue({ stack: 'THIS ERROR IS INTENTIONAL' });
    await controllers.getProductDetails(mockReq, mockRes)
      .then(() => {
        expect(mockRes.statusCode).toBe(500);
      });
  });
  test('getRelated', async () => {
    models.getRelated.mockResolvedValue('I have been called');
    mockReq.params.product_id = 1;
    await controllers.getRelated(mockReq, mockRes)
      .then(() => {
        expect(mockRes.answer).toBeTruthy();
        expect(mockRes.answer).toBe('I have been called');
        expect(models.getRelated).toHaveBeenCalled();
      });
  });
  test('getRelated catch error', async () => {
    models.getRelated.mockRejectedValue({ stack: 'THIS ERROR IS INTENTIONAL' });
    await controllers.getRelated(mockReq, mockRes)
      .then(() => {
        expect(mockRes.statusCode).toBe(500);
      });
  });
  test('getStyles', async () => {
    models.getStyles.mockResolvedValue('I have been called');
    mockReq.params.product_id = 1;
    await controllers.getStyles(mockReq, mockRes)
      .then(() => {
        expect(mockRes.answer).toBeTruthy();
        expect(mockRes.answer.product_id).toBe(1);
        expect(mockRes.answer.results).toBe('I have been called');
        expect(models.getStyles).toHaveBeenCalled();
      });
  });
  test('getStyles catch error', async () => {
    models.getStyles.mockRejectedValue({ stack: 'THIS ERROR IS INTENTIONAL' });
    await controllers.getStyles(mockReq, mockRes)
      .then(() => {
        expect(mockRes.statusCode).toBe(500);
      });
  });
});
