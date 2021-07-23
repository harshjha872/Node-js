const express = require('express');
const user = require('../modals/user');
const Route = express.Router();
const bcrypt = require('bcryptjs');
const { validationResult, check, body } = require('express-validator/check');

Route.get('/signup', (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('signup', {
    title: 'Signup',
    activeClass: null,
    route: '/signup',
    isloggedIn: req.session.loggedIn,
    loginError: message,
    previousInput: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
});

Route.post(
  '/signup',
  [
    check(
      'email',
      'Email does not exist, enter a valid Email address'
    ).isEmail(),
    body('password', 'Write a strong password').isStrongPassword(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error('Password confirmation does not match password');

      return true;
    }),
  ],
  (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render('signup', {
        title: 'Signup',
        activeClass: null,
        route: '/signup',
        isloggedIn: req.session.loggedIn,
        loginError: errors.array()[0].msg,
        previousInput: {
          email: email,
          password: password,
          confirmPassword: req.body.confirmPassword,
        },
      });
    }

    user.findOne({ email: email }).then((result) => {
      if (result) {
        req.flash('error', 'Email already exist, try another.');
        return res.redirect('/signup');
      }
      bcrypt.hash(password, 12).then((hashedpass) => {
        const NewUser = new user({
          email: email,
          password: hashedpass,
          cart: [],
        });

        NewUser.save();
        res.redirect('/');
      });
    });
  }
);

Route.get('/login', (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('login', {
    title: 'Login',
    activeClass: null,
    route: '/login',
    isloggedIn: false,
    loginError: message,
    previousInput: {
      email: '',
      password: '',
    },
  });
});

Route.post('/login', (req, res, next) => {
  const Email = req.body.email;
  const password = req.body.password;

  user.findOne({ email: Email }).then((foundedUser) => {
    if (!foundedUser) {
      req.flash('error', 'Invalid email or password');
      res.redirect('/login');
    }

    bcrypt
      .compare(password, foundedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          req.session.loggedIn = true;
          req.session.user = foundedUser;
          return res.redirect('/');
        } else {
          req.flash('error', 'Invalid password');
          res.redirect('/login');
        }
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
