const express = require('express');
const products = require('../modals/product');

const router = express.Router();

router.get('/addtext', (req, res, next) => {
  res.render('addtext', { title: 'AddText' });
});

router.post('/gettext', (req, res, next) => {
  const NewProduct = new products(req.body.innertext);
  NewProduct.save();
  res.redirect('/');
});

module.exports = router;
