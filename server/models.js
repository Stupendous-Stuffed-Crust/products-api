const pool = require('./db');

module.exports = {
  getProducts(page = 1, count = 5) {
    const offset = page > 1 ? (page * count) - count : 0;
    const query = 'SELECT * FROM products LIMIT $1 OFFSET $2';
    const values = [count, offset];
    return pool
      .query(query, values)
      .then((results) => results.rows)
      .catch((err) => {
        throw new Error(`PROBLEM GETTING PRODUCTS LIST, PAGE: ${page} COUNT: ${count}: ${err.stack}`);
      });
  },
  getProduct(productId) {
    const query = 'SELECT * FROM products WHERE id=$1';
    const values = [productId];
    return pool
      .query(query, values)
      .then((results) => results.rows)
      .catch((err) => {
        throw new Error(`PROBLEM GETTING PRODUCT ID ${productId}: ${err.stack}`);
      });
  },
  getFeatures(productId) {
    const query = 'SELECT feature, value FROM features WHERE product_id=$1';
    const values = [productId];
    return pool
      .query(query, values)
      .then((results) => results.rows)
      .catch((err) => {
        throw new Error(`PROBLEM GETTING FEATURES FOR PRODUCT ID ${productId}: ${err.stack}`);
      });
  },
  getProductDetails(productId) {
    const query = `
    SELECT
    products.*,
    (
      SELECT json_agg(features_list)
      FROM (SELECT feature, value FROM features WHERE features.product_id = products.id)
      AS features_list
    ) as features
    FROM products WHERE id=$1`;
    const values = [productId];
    return pool
      .query(query, values)
      .then((results) => results.rows[0])
      .catch((err) => {
        throw new Error(`PROBLEM GETTING PRODUCT ID ${productId}: ${err.stack}`);
      });
  },
  getRelated(productId) {
    const query = 'SELECT array_agg(related_product_id) FROM related WHERE current_product_id=$1';
    const values = [productId];
    return pool
      .query(query, values)
      .then((results) => results.rows[0].array_agg)
      .catch((err) => {
        throw new Error(`PROBLEM GETTING RELATED PRODUCTS FOR PRODUCT ID ${productId}: ${err.stack}`);
      });
  },
  getStyles(productId) {
    const query = `
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
    FROM styles WHERE styles.product_id=$1`;
    const values = [productId];
    return pool
      .query(query, values)
      .then((stylesResults) => stylesResults.rows)
      .catch((err) => {
        throw new Error(`PROBLEM GETTING STYLES FOR PRODUCT ID ${productId}: ${err.stack}`);
      });
  },
};
