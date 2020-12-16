const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
 vinylFigureId: {type: Number, required: true},
 name:  {type: String, required: true},
 price:  {type: Number, required: true},
 description: {type: String, required: true},
 imagePath: {type: String, required: true},
})

module.exports = mongoose.model('Product', productSchema);