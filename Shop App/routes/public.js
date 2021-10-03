const express = require("express");
const admin = require("./admin");
const products = require("../modals/product");
const Pubrouter = express.Router();
const Product = require("../Database/database-mongoose");

let NoOfProductsDisplayed = 3;

Pubrouter.get("/", (req, res, next) => {
  // products.fetchAll((prod) => {
  //   res.render('public', {
  //     title: 'home page',
  //     activeClass: 'active',
  //     route: '/',
  //     ListOfproducts: prod,
  //   });
  // });
  let previous = false;
  let nextPage = true;
  const page = +req.query.page || 1;

  if (page === 1) previous = false;
  if (page === NoOfProductsDisplayed) nextPage = false;

  //mongoose function find() to fetch data from database
  Product.find()
    .skip((page - 1) * NoOfProductsDisplayed)
    .limit(NoOfProductsDisplayed)
    .then((products) => {
      res.render("public", {
        title: "home page",
        activeClass: "active",
        route: "/",
        ListOfproducts: products,
        isloggedIn: req.session.loggedIn,
        previous: previous,
        next: nextPage,
        totalProduct: NoOfProductsDisplayed,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = Pubrouter;
