const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const ConnectDatabase = (callback) => {
  MongoClient.connect(
    'mongodb+srv://harshjha:Harshjha872aps@node-first.yyzhe.mongodb.net/Shop?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('connected');
      _db = client.db();
      _db
        .collection('product')
        .insertOne({
          name: 'Book',
          price: '20 Rs',
        })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      callback();
    })
    .catch((err) => console.log(err));
};
const getDB = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.ConnectDatabase = ConnectDatabase;
exports.getDB = getDB;
