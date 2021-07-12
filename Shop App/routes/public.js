const express = require('express');

const admin = require('./admin');
const products = require('../modals/product');
const Pubrouter = express.Router();
const Product = require('../Database/database-mongoose');

Pubrouter.get('/', (req, res, next) => {
  // products.fetchAll((prod) => {
  //   res.render('public', {
  //     title: 'home page',
  //     activeClass: 'active',
  //     route: '/',
  //     ListOfproducts: prod,
  //   });
  // });

  //mongoose function find() to fetch data from database
  Product.find().then((products) => {
    res.render('public', {
      title: 'home page',
      activeClass: 'active',
      route: '/',
      ListOfproducts: products,
    });
  });
});

module.exports = Pubrouter;
