require('dotenv').config();
const models = require('../models');
const pool = require('../db');

jest.mock('../db');
pool.query.mockImplementation((query, values) => Promise.resolve({ rows: [{ query, values }] }));

// Kills the connection to the pool after all tests are done. Helps to avoid the:
// "Jest has detected the following 1 open handle potentially keeping Jest from exiting:"
afterAll(() => pool.end());

describe('Models Methods', () => {
  test('getProducts', async () => {
    await models.getProducts()
      .then((results) => {
        expect(results).toBeTruthy();
        expect(results[0].query).toBe('SELECT * FROM products LIMIT $1 OFFSET $2');
        expect(results[0].values).toEqual([5, 0]);
        expect(pool.query).toHaveBeenCalled();
      });
  });
  test('getProducts with page & count', async () => {
    const page = 2;
    const count = 10;
    await models.getProducts(page, count)
      .then((results) => {
        expect(results[0].query).toBe('SELECT * FROM products LIMIT $1 OFFSET $2');
        expect(results[0].values).toEqual([10, 10]);
      });
  });
  test('getProduct (singular)', async () => {
    const productId = 1;
    await models.getProduct(productId)
      .then((results) => {
        expect(results[0].query).toBe('SELECT * FROM products WHERE id=$1');
        expect(results[0].values).toEqual([1]);
      });
  });
  test('getFeatures', async () => {
    const productId = 1;
    await models.getFeatures(productId)
      .then((results) => {
        expect(results[0].query).toBe('SELECT feature, value FROM features WHERE product_id=$1');
      });
  });
  test('getProductDetails', async () => {
    const productId = 1;
    await models.getProductDetails(productId)
      .then((results) => {
        expect(results.query).toBe(`
    SELECT
    products.*,
    (
      SELECT json_agg(features_list)
      FROM (SELECT feature, value FROM features WHERE features.product_id = products.id)
      AS features_list
    ) as features
    FROM products WHERE id=$1`);
      });
  });
  test('getRelated', async () => {
    pool.query.mockImplementationOnce((query, values) => Promise.resolve(
      {
        rows: [
          {
            array_agg: { query, values },
          },
        ],
      },
    ));
    const productId = 1;
    await models.getRelated(productId)
      .then((results) => {
        expect(results.query).toBe('SELECT array_agg(related_product_id) FROM related WHERE current_product_id=$1');
      });
  });
  test('getStyles', async () => {
    const productId = 1;
    await models.getStyles(productId)
      .then((results) => {
        expect(results[0].query).toBe(`
    SELECT
    styles.id AS style_id,
    styles.name,
    styles.sale_price,
    styles.original_price,
    styles.default_style AS "default?",
    (
      SELECT json_agg(photos_list)
      FROM (SELECT photos.thumbnail_url, photos.url FROM PHOTOS where PHOTOS.style_id = styles.id)
      AS photos_list
    ) AS photos,
    (
      SELECT json_object_agg(skus_obj.id, skus_obj)
      FROM (SELECT skus.id, skus.quantity, skus.size FROM skus WHERE skus.style_id = styles.id)
      AS skus_obj
    ) AS skus
    FROM styles WHERE styles.product_id=$1`);
      });
  });
});
