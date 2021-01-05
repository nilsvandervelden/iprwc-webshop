const mongoose = require('mongoose');

const productOrderSchema = new mongoose.Schema({
  vinylFigureId: {type: Number, required: true},
  name:  {type: String, required: true},
  price:  {type: Number, required: true},
  description: {type: String, required: true},
  imagePath: {type: String, required: true},
  amount: {type: Number, required: true}
})
module.exports = mongoose.model('productOrder', productOrderSchema);