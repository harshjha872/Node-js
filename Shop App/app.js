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
// const User = require('./modals/user');
const session = require('express-session');
const MongoConnectSession = require('connect-mongodb-session')(session);

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//SESSIONS
const MongoStore = new MongoConnectSession({
  uri: 'mongodb+srv://harshjha:Harshjha872aps@node-first.yyzhe.mongodb.net/shop?etryWrites=true&w=majority',
  collection: 'sessions',
});

app.use(
  session({
    secret: 'My secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore,
  })
);

app.post('/login', (req, res, next) => {
  req.session.loggedIn = true;
  res.redirect('/');
});

app.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

//ROUTES

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
    // const user = new User({
    //   username: 'harshjha872',
    //   password: 'harshjha@',
    //   cart: [],
    // });
    // user.save();
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// app.listen(3000);
