/* eslint-disable camelcase */
const models = require('./models');

module.exports = {
  getProducts(req, res) {
    const { page, count } = req.query;
    return models
      .getProducts(page, count)
      .then((results) => res.json(results))
      .catch((err) => {
        console.error('PROBLEM GETTING PRODUCTS FROM DATABASE: ', err.stack);
        res.sendStatus(500);
      });
  },
  // getProductDetails(req, res) {
  //   const productId = req.params.product_id;
  //   let productDetails;
  //   return models
  //     .getProduct(productId)
  //     .then((results) => {
  //       [productDetails] = results;
  //       return models.getFeatures(productId);
  //     })
  //     .then((results) => {
  //       productDetails.features = results;
  //       res.json(productDetails);
  //     });
  // },
  getProductDetails(req, res) {
    const productId = req.params.product_id;
    return models
      .getProductDetails(productId)
      .then((results) => res.json(results))
      .catch((err) => {
        console.error('PROBLEM GETTING PRODUCT DETAILS FROM DATABASE: ', err.stack);
        res.sendStatus(500);
      });
  },
  getRelated(req, res) {
    const productId = req.params.product_id;
    return models
      .getRelated(productId)
      .then((results) => res.json(results))
      .catch((err) => {
        console.error('PROBLEM GETTING RELATED PRODUCTS FROM DATABASE: ', err.stack);
        res.sendStatus(500);
      });
  },
  getStyles(req, res) {
    const productId = req.params.product_id;
    return models.getStyles(productId)
      .then((results) => res.json({ product_id: productId, results }))
      .catch((err) => {
        console.error('PROBLEM GETTING PRODUCT STYLES FROM DATABASE: ', err.stack);
        res.sendStatus(500);
      });
  },
};
