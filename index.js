const fs = require('fs');
// const data = fs.readFileSync('./txt/read.txt', 'utf-8');
const data2 = fs.readFile('./txt/read.txt', 'utf-8', (err, data) => {
  console.log(data);
});
console.log('First statement');
