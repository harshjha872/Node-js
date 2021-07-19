const express = require('express');
const products = require('../modals/product');
const Product = require('../Database/database-mongoose');

const router = express.Router();

router.get('/addtext', (req, res, next) => {
  res.render('addtext', {
    title: 'AddText',
    activeClass: 'active',
    route: '/admin/addtext',
    isloggedIn: req.session.loggedIn,
  });
});

router.post('/gettext', (req, res, next) => {
  // const NewProduct = new products(
  //   req.body.title,
  //   req.body.discription,
  //   req.body.imageUrl,
  //   Number(req.body.price)
  // );

  const NewProduct = new Product({
    title: req.body.title,
    discription: req.body.discription,
    imageUrl: req.body.imageUrl,
    price: Number(req.body.price),
  });

  //.save() is a mongoose inbuilt function that saves our data to the database
  NewProduct.save().then(() => console.log('product created'));

  res.redirect('/');
});

module.exports = router;
