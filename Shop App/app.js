const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const adminRouter = require('./routes/admin');
const PublicRouter = require('./routes/public');
const detailRouter = require('./routes/productDetail');
// const Database = require('./Database/database');
const editRouter = require('./routes/editrouter');
const CartRouter = require('./routes/cartRoute');
const mongoose = require('mongoose');
const User = require('./modals/user');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use(CartRouter);
app.use('/product', detailRouter);
app.use('/editproduct', editRouter);

app.use(PublicRouter);

app.use((req, res, next) => {
  res.status(404).render('pnf', {
    title: 'Page not found',
    activeClass: '',
    route: '',
  });
});

// Database.ConnectDatabase(() => {
//   const db = Database.getDB();
//   console.log(db);
// });

mongoose
  .connect(
    'mongodb+srv://harshjha:Harshjha872aps@node-first.yyzhe.mongodb.net/shop?etryWrites=true&w=majority'
  )
  .then(() => {
    const user = new User({
      username: 'harshjha872',
      password: 'harshjha@',
      cart: [],
    });
    user.save();
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// app.listen(3000);
