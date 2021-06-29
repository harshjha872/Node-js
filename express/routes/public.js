const express = require('express');
const path = require('path');

const Pubrouter = express.Router();

Pubrouter.get('/', (req, res, next) => {
  // res.sendFile(path.join(__dirname, '../', 'views', 'public.html'));
  res.render('public', {
    title: 'home page',
    ListOfNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  });
});

module.exports = Pubrouter;
