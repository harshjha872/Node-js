const express = require('express');

const CartRouter = express.Router();

CartRouter.get('/cart', (req, res, next) => {
  res.render('cart.ejs', {
    title: 'Cart',
    activeClass: 'active',
    route: '/cart',
    ListOfproducts: null,
  });
});

CartRouter.post('/cart', (req, res, next) => {
  const addtocartProd = req.body.cartId;
  console.log(addtocartProd);
  res.redirect('/');
});

module.exports = CartRouter;
