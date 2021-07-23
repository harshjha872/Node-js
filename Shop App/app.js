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
const Auth = require('./routes/Auth');
const Protectroute = require('./routes/ProtectRoutes');
const flash = require('connect-flash');
const { check } = require('express-validator/check');
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

//FlASHES

app.use(flash());

//ROUTES

app.use(Auth);
app.use(PublicRouter);
app.use('/product', detailRouter);
app.use('/admin', Protectroute, adminRouter);
app.use(Protectroute, CartRouter);
app.use('/editproduct', Protectroute, editRouter);

app.use((req, res, next) => {
  res.status(404).render('pnf', {
    title: 'Page not found',
    activeClass: '',
    route: '',
    isloggedIn: req.session.loggedIn,
  });
});

mongoose
  .connect(
    'mongodb+srv://harshjha:Harshjha872aps@node-first.yyzhe.mongodb.net/shop?etryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
