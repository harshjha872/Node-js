const express = require('express');
const user = require('../modals/user');
const Route = express.Router();

Route.get('/signup', (req, res, next) => {
  res.render('Auth', {
    title: 'Login',
    activeClass: null,
    route: '/login',
  });
});

Route.post('/signup', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const NewUser = new user({
    email: email,
    password: password,
    cart: [],
  });
});
module.exports = Route;
