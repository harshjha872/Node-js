const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

const AProduct = new mongoose.Schema({
  title: String,
  imageUrl: String,
  price: Number,
});
