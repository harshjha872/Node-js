const express = require('express');

const router = express.Router();

const products = [];
router.get('/addtext', (req, res, next) => {
  res.render('addtext', { title: 'AddText' });
});

router.post('/gettext', (req, res, next) => {
  products.push({ item: req.body.innertext });
  res.redirect('/');
});

exports.router = router;
exports.products = products;
