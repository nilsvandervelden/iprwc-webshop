const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productOrderSchema = new Schema({
  vinylFigureId: {type: Number, required: true},
  name:  {type: String, required: true},
  price:  {type: Number, required: true},
  description: {type: String, required: true},
  imagePath: {type: String, required: true},
  amount: {type: Number, required: true}

module.exports = mongoose.model('Order', productOrderSchema);