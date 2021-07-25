const express = require('express');
const products = require('../modals/product');
const Product = require('../Database/database-mongoose');

const router = express.Router();

router.get('/addtext', (req, res, next) => {
  res.render('addtext', {
    title: 'AddText',
    activeClass: 'active',
    route: '/admin/addtext',
    isloggedIn: req.session.loggedIn,
  });
});

router.post('/gettext', (req, res, next) => {
  // const NewProduct = new products(
  //   req.body.title,
  //   req.body.discription,
  //   req.body.imageUrl,
  //   Number(req.body.price)
  // );
  const title = req.body.title;
  const discription = req.body.discription;
  const image = req.file;
  const price = Number(req.body.price);

  const imageUrl = `images/${image.path.split('\\')[1]}.${
    image.mimetype.split('/')[1]
  }`;

  console.log(imageUrl);

  if (!image) {
    res.redirect('/');
  }

  const NewProduct = new Product({
    title: title,
    discription: discription,
    imageUrl: imageUrl,
    price: price,
    userId: req.session.user._id,
  });

  //.save() is a mongoose inbuilt function that saves our data to the database
  NewProduct.save()
    .then(() => {
      console.log('product created');
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/rwgowrjnwrobiwr');
    });
});

module.exports = router;
