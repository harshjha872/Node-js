module.exports = (req, res, next) => {
  if (req.session.loggedIn === true) next();
  else res.redirect('/login');
};
