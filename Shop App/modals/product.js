const path = require('path');
const fs = require('fs');

module.exports = class Product {
  constructor(title) {
    this.title = title;
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
};
