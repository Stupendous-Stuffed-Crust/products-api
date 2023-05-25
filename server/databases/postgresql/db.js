const { Client, Pool } = require('pg');

// const pool = new Pool({
//   host: 'localhost',
//   user: 'davidguy',
//   password: 'davidguy',
//   max: 10,
// });

const client = new Client({
  host: 'localhost',
  user: 'davidguy',
  password: 'davidguy',
});

client.connect();

module.exports.client = client;
// module.exports.pool = pool;
