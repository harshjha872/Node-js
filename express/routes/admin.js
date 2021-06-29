const express = require('express');

const path = require('path');
const router = express.Router();

router.get('/addtext', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'addtext.html'));
});

router.post('/gettext', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
