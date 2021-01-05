const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  products: {
    type: mongoose.Types.ObjectId,
    ref: "ProductOrder",
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

