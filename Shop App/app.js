const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const adminRouter = require('./routes/admin');
const PublicRouter = require('./routes/public');
const detailRouter = require('./routes/productDetail');
const Database = require('./Database/database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/product', detailRouter);
app.use(PublicRouter);

app.use((req, res, next) => {
  res.status(404).render('pnf', {
    title: 'Page not found',
  });
});

Database.ConnectDatabase(() => {
  const db = Database.getDB();
  console.log(db);

  app.listen(3000);
});
