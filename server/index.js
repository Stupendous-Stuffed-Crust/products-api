/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const controllers = require('./controllers');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/products/:product_id/related', controllers.getRelated);
app.get('/products/:product_id/styles', controllers.getStyles);
app.get('/products/:product_id', controllers.getProductDetails);
app.get('/products', controllers.getProducts);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
