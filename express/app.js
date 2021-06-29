const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const adminRouter = require('./routes/admin');
const PublicRouter = require('./routes/public');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use(PublicRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'pnf.html'));
});

app.listen(3000);
