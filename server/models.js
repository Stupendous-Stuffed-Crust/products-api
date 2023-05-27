const pool = require('./db');

module.exports = {
  getProducts(page = 1, count = 5) {
    const offset = page > 1 ? (page * count) - count : 0;
    const query = 'SELECT * FROM products LIMIT $1 OFFSET $2';
    const values = [count, offset];
    return pool
      .query(query, values)
      .then((results) => results.rows)
      .catch((err) => console.error(`PROBLEM GETTING PRODUCTS LIST, PAGE: ${page} COUNT: ${count}`, err.stack));
  },
  getProduct(productId) {
    const query = 'SELECT * FROM products WHERE id=$1';
    const values = [productId];
    return pool
      .query(query, values)
      .then((results) => results.rows)
      .catch((err) => console.error(`PROBLEM GETTING PRODUCT ID ${productId}: `, err.stack));
  },
  getFeatures(productId) {
    const query = 'SELECT feature, value FROM features WHERE product_id=$1';
    const values = [productId];
    return pool
      .query(query, values)
      .then((results) => results.rows)
      .catch((err) => console.error(`PROBLEM GETTING FEATURES FOR PRODUCT ID ${productId}: `, err.stack));
  },
  getRelated(productId) {
    const query = 'SELECT array_agg(related_product_id) FROM related WHERE current_product_id=$1';
    const values = [productId];
    return pool
      .query(query, values)
      .then((results) => results.rows[0].array_agg)
      .catch((err) => console.error(`PROBLEM GETTING RELATED PRODUCTS FOR PRODUCT ID ${productId}: `, err.stack));
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
      .catch((err) => console.error(`PROBLEM GETTING STYLES FOR PRODUCT ID ${productId}: `, err.stack));
  },
  // getPhotos(styleId) {
  //   const query = 'SELECT url, thumbnail_url FROM photos WHERE style_id=$1';
  //   const values = [styleId];
  //   return pool
  //     .query(query, values)
  //     .then((results) => results.rows)
  //     .catch((err) => console.error(`PROBLEM GETTING PHOTOS FOR STYLE ID ${styleId}: `, err.stack));
  // },
  // getSkus(styleId) {
  //   const query = 'SELECT id, size, quantity FROM skus WHERE style_id=$1';
  //   const values = [styleId];
  //   return pool
  //     .query(query, values)
  //     .then((results) => results.rows)
  //     .catch((err) => console.error(`PROBLEM GETTING SKUS FOR STYLE ID ${styleId}: `, err.stack));
  // },
};

// client.query(`
// SELECT
// styles.id AS style_id,
// styles.style_name AS "name",
// styles.original_price,
// styles.sale_price,
// styles.default_style AS "default?",
// (
//   SELECT json_agg(nested_photos)
//   FROM (
//     SELECT
//     photos.thumbnail_url,
//     photos.photo_url AS url
//     FROM photos
//     WHERE photos.styleid = styles.id
//     )
//     AS nested_photos)
//   AS photos,
//   (
//     SELECT
//     json_object_agg(nested_skus.id, nested_skus)
//     FROM (
//       SELECT
//       skus.id,
//       skus.quantity,
//       skus.size
//       FROM skus
//       WHERE skus.styleid = styles.id
//       )
//       AS nested_skus
//       )
//       AS skus
//       FROM styles WHERE styles.productid = $1`, [productID], (err, result) => {