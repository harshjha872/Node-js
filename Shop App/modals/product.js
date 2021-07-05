const path = require('path');
const fs = require('fs');
const { json } = require('express');

module.exports = class Product {
  constructor(title, discription, imageUrl, price) {
    this.title = title;
    this.discription = discription;
    this.imageUrl = imageUrl;
    this.price = price;
    this.id = Math.random().toString();
  }

  save() {
    let content;
    fs.readFile(
      path.join(__dirname, '../', 'data', 'data.json'),
      (err, data) => {
        if (!err) {
          content = JSON.parse(data);
          content.push(this);
          fs.writeFile(
            path.join(__dirname, '../', 'data', 'data.json'),
            JSON.stringify(content),
            (err) => console.log(err)
          );
        } else {
          console.log(err);
        }
      }
    );
  }

  static fetchAll(cd) {
    fs.readFile(
      path.join(__dirname, '../', 'data', 'data.json'),
      (err, data) => {
        if (err) {
          return cd([]);
        } else {
          cd(JSON.parse(data));
        }
      }
    );
  }

  static editProduct(
    updatedTitle,
    updatedDiscription,
    updatedImageUrl,
    updatedPrice,
    id
  ) {
    let Allproducts;
    fs.readFile(
      path.join(__dirname, '../', 'data', 'data.json'),
      (err, data) => {
        if (!err) {
          Allproducts = JSON.parse(data);
          const editthisId = Allproducts.find((curr) => curr.id === id);
          editthisId.title = updatedTitle;
          editthisId.discription = updatedDiscription;
          editthisId.imageUrl = updatedImageUrl;
          editthisId.price = updatedPrice;
          const writeAllproducts = JSON.stringify(Allproducts);
          fs.writeFile(
            path.join(__dirname, '../', 'data', 'data.json'),
            writeAllproducts,
            (err) => console.log(err)
          );
        } else {
          console.log(err);
        }
      }
    );
  }

  static deleteProduct(id) {
    let Products;
    fs.readFile(
      path.join(__dirname, '../', 'data', 'data.json'),
      (err, data) => {
        if (!err) {
          Products = JSON.parse(data);
          const NewProducts = Products.filter((ele) => ele.id !== id);
          fs.writeFile(
            path.join(__dirname, '../', 'data', 'data.json'),
            JSON.stringify(NewProducts),
            (err) => console.log(err)
          );
        } else {
          console.log(err);
        }
      }
    );
  }
};
