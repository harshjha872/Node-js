// const fs = require('fs');
const http = require('http');
const routes = require('./routes');
// const url = require('url');

// const data = fs.readFileSync('./txt/read.txt', 'utf-8');
// const data2 = fs.readFile('./txt/read.txt', 'utf-8', (err, data) => {
//   console.log(data);
// });
// console.log('First statement');

const server = http.createServer(routes);

server.listen(8000, '127.0.0.1', () => {
  console.log('Running on port 8000');
});
