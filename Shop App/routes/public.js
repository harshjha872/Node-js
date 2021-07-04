const express = require('express');

const admin = require('./admin');
const products = require('../modals/product');
const Pubrouter = express.Router();

Pubrouter.get('/', (req, res, next) => {
  products.fetchAll((prod) => {
    res.render('public', {
      title: 'home page',
      activeClass: 'active',
      route: '/',
      ListOfNumber: prod,
    });
  });
});

module.exports = Pubrouter;
