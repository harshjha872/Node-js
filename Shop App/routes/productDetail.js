const express = require('express');
const products = require('../modals/product');
const detailRouter = express.Router();

detailRouter.get('/:id', (req, res, next) => {
  const productID = req.params.id;
  products.fetchAll((allProd) => {
    const foundedProd = allProd.find((curr) => curr.id === productID);
    res.render('productDetail', {
      title: 'details',
      activeClass: '',
      route: `/product/${productID}`,
      product: foundedProd,
    });
  });
});

module.exports = detailRouter;
