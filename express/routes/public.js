const express = require('express');
const path = require('path');

const Pubrouter = express.Router();

Pubrouter.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'public.html'));
});

module.exports = Pubrouter;
