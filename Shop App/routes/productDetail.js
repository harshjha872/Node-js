const express = require('express');
// const products = require('../modals/product');
const detailRouter = express.Router();
const Product = require('../Database/database-mongoose');

detailRouter.get('/:productId', (req, res, next) => {
  const productID = req.params.productId;
  console.log(req.params);
  Product.findById(productID)
    .then((prod) => {
      res.render('productDetail', {
        title: 'details',
        activeClass: '',
        route: `/product/${productID}`,
        product: prod,
        isloggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => console.log(err));
  // products.fetchAll((allProd) => {
  //   const foundedProd = allProd.find((curr) => curr.id === productID);
  //   res.render('productDetail', {
  //     title: 'details',
  //     activeClass: '',
  //     route: `/product/${productID}`,
  //     product: foundedProd,
  //   });
  // });
});

detailRouter.post('/deleteproduct', (req, res, next) => {
  const deleteThisProductID = req.body.deleteProduct;
  Product.findByIdAndRemove(deleteThisProductID).then(() => res.redirect('/'));
  // products.deleteProduct(deleteThisProduct);
  // res.redirect('/');
});

module.exports = detailRouter;
