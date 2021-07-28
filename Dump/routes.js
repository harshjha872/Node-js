const fs = require('fs');

const routeHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('MyName', 'Harsh');
    res.write('<html>');
    res.write('<head><title>First Node project</title></head>');
    res.write(
      '<body><form action="/meraurl" method="POST"><input type="text" name="meraurl"/><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/meraurl' && method === 'POST') {
    const ourText = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      ourText.push(chunk);
    });
    req.on('end', () => {
      const message = Buffer.concat(ourText).toString();
      console.log(message);
      fs.writeFileSync('writtenFile.txt', message.split('=')[1]);
      res.statusCode = 200;
      res.setHeader('Location', '/');
      return res.end();
    });
  }
};

// module.exports = {
//     handler: routeHandler,
//     text: 'this is the text'
// }

// module.exports.handler = routeHandler;
// module.exports.text = 'Some text';

// exports.handler = routeHandler;
// exports.text = 'Some text';

module.exports = routeHandler;
