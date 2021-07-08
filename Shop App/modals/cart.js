const fs = require('fs');
const path = require('path');
const products = require('../modals/product');

module.exports = class Cart {
  static Add(id) {
    let Cartproducts;
    let AddcartProduct;
    let data;
    products.fetchAll((prods) => {
      AddcartProduct = prods.find((ele) => ele.id === id);
      Cartproducts = { ...AddcartProduct, qty: 1 };
      fs.readFile(
        path.join(__dirname, '../', 'data', 'cart.json'),
        (err, fileContent) => {
          data = JSON.parse(fileContent);
          if (data.products.find((ele) => ele.id === id)) {
            const updateQty = data.products.find((ele) => ele.id === id);
            updateQty.qty = updateQty.qty + 1;
          } else {
            data.products.push(Cartproducts);
          }
          data.totalprice = data.products.reduce(
            (sum, cur) => sum + cur.price,
            0
          );
          fs.writeFile(
            path.join(__dirname, '../', 'data', 'cart.json'),
            JSON.stringify(data),
            (err) => console.log(err)
          );
        }
      );
    });
  }

  static fetchCartProd(cd) {
    fs.readFile(
      path.join(__dirname, '../', 'data', 'cart.json'),
      (err, content) => {
        if (err) {
          cd([]);
        } else {
          cd(JSON.parse(content));
          console.log(JSON.parse(content));
        }
      }
    );
  }
};
