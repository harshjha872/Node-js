// const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// app.use((req, res, next) => {
//   console.log('I am in the middlewhere');
//   next();
// });
// app.use('/', (req, res, next) => {
//   console.log('This always runs');
//   next();
// });
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/addtext', (req, res, next) => {
  res.send(
    '<form action="/gettext" method="POST"><input type="text" name="innertext"/><button type="submit">Add</button></form>'
  );
});

app.post('/gettext', (req, res, next) => {
  //   res.send('<h1>This is area where we get input text</h1>');
  console.log(req.body);
  res.redirect('/this');
});

app.get('/this', (req, res, next) => {
  res.send('Heeelo');
});

app.use('/', (req, res, next) => {
  //   console.log('I am in second middlewhere');
  // express has default header that is content-type text/html u can also set new headers like
  // res.setHeader
  res.send('<h1>Hello form express</h1>');
});

app.listen(3000);

// const server = http.createServer(app);

// server.listen(3000);
