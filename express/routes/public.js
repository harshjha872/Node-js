const express = require('express');
const path = require('path');
const admin = require('./admin');
const Pubrouter = express.Router();

Pubrouter.get('/', (req, res, next) => {
  // res.sendFile(path.join(__dirname, '../', 'views', 'public.html'));
  res.render('public', {
    title: 'home page',
    ListOfNumber: admin.products,
  });
});

module.exports = Pubrouter;
