const express = require('express');
const { route } = require('./admin');
const Product = require('../modals/product');
const editRouter = express.Router();
const ProductM = require('../Database/database-mongoose');
let id;

editRouter.get('/:id', (req, res, next) => {
  id = req.params.id;
  // Product.fetchAll((allproducts) => {
  //   const CurrProduct = allproducts.find((ele) => ele.id === id);
  //   res.render('edit', {
  //     title: 'edit',
  //     activeClass: 'active',
  //     route: `/editproduct/${id}`,
  //     product: CurrProduct,
  //   });
  // });

  ProductM.findById(id).then((prod) => {
    res.render('edit', {
      title: 'edit',
      activeClass: 'active',
      route: `/editproduct/${id}`,
      product: prod,
    });
  });
});

editRouter.post('/doneedit', (req, res, next) => {
  // Product.editProduct(
  //   req.body.updatedtitle,
  //   req.body.updateddiscription,
  //   req.body.updatedimageUrl,
  //   req.body.updatedprice,
  //   id
  // );
  ProductM.findById(id)
    .then((prod) => {
      prod.title = req.body.updatedtitle;
      prod.discription = req.body.updateddiscription;
      prod.imageUrl = req.body.updatedimageUrl;
      prod.price = req.body.updatedprice;
      return prod.save();
    })
    .then(() => res.redirect('/'));
});

module.exports = editRouter;
