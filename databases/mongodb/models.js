const mongoose = require('./db');

const productSchema = mongoose.Schema({
  product_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  slogan: String,
  description: String,
  category: String,
  default_price: { type: String, required: true },
  features: [{ feature: String, value: String }],
  related: [Number],
});

const styleSchema = mongoose.Schema({
  style_id: { type: Number, required: true, unique: true },
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
  original_price: { type: String, required: true },
  sale_price: { type: String, required: true },
  default: { type: Boolean, required: true },
  photos: [{
    thumbnail_url: String,
    url: String,
  }],
  skus: [{
    sku: { type: Number, required: true, unique: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
  }],
});

const Products = mongoose.model('Products', productSchema);
const Styles = mongoose.model('Styles', styleSchema);

module.exports.Products = Products;
module.exports.Styles = Styles;
