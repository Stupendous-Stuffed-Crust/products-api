const fs = require('fs');
const readline = require('readline');

const inputFile = '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/photos.csv';
const outputFile = '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/photos-fixed.csv';

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

const rl = readline.createInterface({
  input: readStream,
  output: writeStream,
});

rl.on('line', (line) => {
  if (line === 'id,styleId,url,thumbnail_url') {
    writeStream.write(`${line}\n`);
  } else if (!line.endsWith('"')) {
    writeStream.write(`${line}"\n`);
  } else {
    writeStream.write(`${line}\n`);
  }
});

rl.on('close', () => {
  console.log('finished');
});
