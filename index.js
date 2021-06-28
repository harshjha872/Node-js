const fs = require('fs');
const http = require('http');
const url = require('url');

// const data = fs.readFileSync('./txt/read.txt', 'utf-8');
// const data2 = fs.readFile('./txt/read.txt', 'utf-8', (err, data) => {
//   console.log(data);
// });
// console.log('First statement');

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.end('Hello to the node js createdserver');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('server running');
});
