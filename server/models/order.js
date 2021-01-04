const mongoose = require('mongoose');
const productOrderSchema = require('./productOrder')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: {
    type: [productOrderSchema],
    required: true,
    unique: false
  },
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  delivered: {
    type: Boolean,
    default: false
  },
})

module.exports = mongoose.model('Order', orderSchema);