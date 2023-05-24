/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
// const mongodbControllers = require('../databases/mongodb/controllers');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
