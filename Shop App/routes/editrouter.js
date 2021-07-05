const express = require('express');
const { route } = require('./admin');
const Product = require('../modals/product');
const editRouter = express.Router();
let id;

editRouter.get('/:id', (req, res, next) => {
  id = req.params.id;
  Product.fetchAll((allproducts) => {
    const CurrProduct = allproducts.find((ele) => ele.id === id);
    res.render('edit', {
      title: 'edit',
      activeClass: 'active',
      route: `/editproduct/${id}`,
      product: CurrProduct,
    });
  });
});

editRouter.post('/doneedit', (req, res, next) => {
  Product.editProduct(
    req.body.updatedtitle,
    req.body.updateddiscription,
    req.body.updatedimageUrl,
    req.body.updatedprice,
    id
  );
  res.redirect('/');
});

module.exports = editRouter;
