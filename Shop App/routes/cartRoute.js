const express = require('express');
const cart = require('../modals/cart');

const CartRouter = express.Router();

CartRouter.get('/cart', (req, res, next) => {
  cart.fetchCartProd((prod) => {
    res.render('cart.ejs', {
      title: 'Cart',
      activeClass: 'active',
      route: '/cart',
      ListOfproducts: prod,
    });
  });
});

CartRouter.post('/cart', (req, res, next) => {
  const addtocartProd = req.body.cartId;
  cart.Add(addtocartProd);
  res.redirect('/');
});

CartRouter.post('/deleteproductcart', (req, res, next) => {
  const deleteProdCart = req.body.deleteProductfromcart;
  cart.deleteProduct(deleteProdCart);
  res.redirect('/');
});

module.exports = CartRouter;
