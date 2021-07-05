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

module.exports = CartRouter;
