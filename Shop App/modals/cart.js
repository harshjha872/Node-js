const fs = require('fs');
const path = require('path');
const products = require('../modals/product');

module.exports = class Cart {
  #Cartproducts = [];
  #TotalPrice = null;

  static Add(id) {
    let AddcartProduct;
    products.fetchAll((prods) => {
      AddcartProduct = prods.find(ele => ele.id === id);
      Cartproducts = [ {...AddcartProduct , qty = 1}];
      fs.readFile(
        path.join(__dirname, '../', 'data', 'cart.json'),
        (err, fileContent) => {
          cartProduct = JSON.parse(fileContent);
          cartProduct.push(AddcartProduct);
          fs.writeFile(__dirname, '../', 'data', 'cart.json',JSON.stringify(cartProduct),err => console.log(err))
        }
      );
    });


  }
};
