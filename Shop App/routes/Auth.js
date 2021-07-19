const express = require('express');
const user = require('../modals/user');
const Route = express.Router();
const bcrypt = require('bcryptjs');

Route.get('/signup', (req, res, next) => {
  res.render('signup', {
    title: 'Signup',
    activeClass: null,
    route: '/signup',
    isloggedIn: req.session.loggedIn,
  });
});

Route.post('/signup', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  user.findOne({ email: email }).then((result) => {
    if (result) {
      return res.redirect('/');
    }
    bcrypt.hash(password, 12).then((hashedpass) => {
      const NewUser = new user({
        email: email,
        password: hashedpass,
        cart: [],
      });

      NewUser.save();
    });
  });
  res.redirect('/');
});

Route.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Login',
    activeClass: null,
    route: '/login',
    isloggedIn: false,
  });
});

Route.post('/login', (req, res, next) => {
  const Email = req.body.email;
  const password = req.body.password;
  user.findOne({ email: Email }).then((foundedUser) => {
    if (!foundedUser) {
      res.redirect('/login');
    }
    bcrypt
      .compare(password, foundedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          req.session.loggedIn = true;
          req.session.user = foundedUser;
          return res.redirect('/');
        }
        res.redirect('/login');
      })
      .catch((err) => console.log(err));
  });
});

Route.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
});

module.exports = Route;
