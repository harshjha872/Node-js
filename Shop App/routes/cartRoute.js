const express = require('express');
const user = require('../modals/user');
const CartRouter = express.Router();
const products = require('../Database/database-mongoose');

CartRouter.get('/cart', (req, res, next) => {
  user.findOne({ email: req.session.user.email }).then((CurrUser) => {
    // const prods = CurrUser.cart.map((ele) => {
    //   return products
    //     .findById(String(ele.CartProduct))
    //     .then((Prod) => {
    //       return Prod;
    //     })
    //     .catch((err) => console.log(err));
    // });
    console.log(CurrUser);
    const Prods = CurrUser.cart.map((ele) => ele.CartProduct);
    console.log(Prods);
    const detailedProduct = [];
    Prods.forEach((ele) => {
      products.findById(String(ele)).then((prod) => detailedProduct.push(prod));
    });
    console.log(detailedProduct);
    res.redirect('/');
  });

  // let totalprice = 0;

  // prod.forEach((ele) => {
  //   totalprice = totalprice + ele.price * ele.qty;

  // cart.fetchCartProd((prod) => {
  //   res.render('cart.ejs', {
  //     title: 'Cart',
  //     activeClass: 'active',
  //     route: '/cart',
  //     ListOfproducts: prod,
  // isloggedIn: req.session.loggedIn
  //   });
  // });
});

CartRouter.post('/cart', (req, res, next) => {
  const addtocartProd = req.body.cartId;
  user.findOne({ email: req.session.user.email }).then((Curruser) => {
    if (
      Curruser.cart.find(
        (ele) => String(ele.CartProduct) === String(addtocartProd)
      )
    ) {
      const increaseQty = Curruser.cart.find(
        (ele) => String(ele.CartProduct) === String(addtocartProd)
      );
      increaseQty.quantity = increaseQty.quantity + 1;
    } else {
      Curruser.cart.push({
        CartProduct: addtocartProd,
        quantity: 1,
      });
    }
    Curruser.save();
  });

  res.redirect('/');
});

CartRouter.post('/deleteproductcart', (req, res, next) => {
  const deleteProdCart = req.body.deleteProductfromcart;
  cart.deleteProduct(deleteProdCart);
  res.redirect('/');
});

module.exports = CartRouter;
