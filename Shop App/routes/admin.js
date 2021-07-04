const express = require('express');
const products = require('../modals/product');

const router = express.Router();

router.get('/addtext', (req, res, next) => {
  res.render('addtext', {
    title: 'AddText',
    activeClass: 'active',
    route: '/admin/addtext',
  });
});

router.post('/gettext', (req, res, next) => {
  const NewProduct = new products(
    req.body.innertext,
    'svwrvw',
    'rsvwrvw',
    'wefwefw'
  );
  NewProduct.save();
  res.redirect('/');
});

module.exports = router;
