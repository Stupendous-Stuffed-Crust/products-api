/* eslint-disable camelcase */
const models = require('./models');

module.exports = {
  getProducts(req, res) {
    const { page, count } = req.query;
    models
      .getProducts(page, count)
      .then((results) => res.json(results))
      .catch((err) => console.error('PROBLEM GETTING PRODUCTS FROM DATABASE', err));
  },
  getProductDetails(req, res) {
    const productId = req.params.product_id;
    let productDetails;
    models
      .getProduct(productId)
      .then((results) => {
        [productDetails] = results;
        return models.getFeatures(productId);
      })
      .then((results) => {
        productDetails.features = results;
        res.json(productDetails);
      });
  },
  getRelated(req, res) {
    const productId = req.params.product_id;
    models
      .getRelated(productId)
      .then((results) => res.json(results));
  },
  getStyles(req, res) {
    const productId = req.params.product_id;
    models.getStyles(productId)
      .then((results) => res.json(results));
  },
};
