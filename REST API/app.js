const express = require('express');
const bodyParser = require('body-parser');
const Routes = require('./routes/route');

const app = express();

app.use(bodyParser.json()); // application/json
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});
app.use(Routes);

app.get('/', (req, res, next) => {
  res.json({
    message: 'Hello',
  });
});

app.listen(8000);
