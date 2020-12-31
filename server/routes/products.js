const express = require("express");

const Product = require("../models/product");
const checkAuth = require("../middleware/check-auth")

const router = express.Router();

router.post(
  "",
  checkAuth,
  (req, res, next ) => {
  const product = new Product({
    vinylFigureId: req.body.vinylFigureId,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imagePath: req.body.imagePath
  });
  product.save().then(createdProduct => {
    res.status(201).json({
      message: 'Product added successfully',
      productId: createdProduct._id
    });
  });
});

router.put(
  "/:id",
  checkAuth,
  (req, res, next) => {
  const product = new Product({
    _id: req.body.id,
    vinylFigureId: req.body.vinylFigureId,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imagePath: req.body.imagePath
  });
  Product.updateOne({ _id: req.params.id }, product).then(result => {
    res.status(200).json({message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Product.find().then(documents => {
    res.status(200).json({
      message: 'Products fetched successfully!',
      products: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id).then(product => {
    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404).json({message: 'Product not found!'});
    }
  });
});

router.delete(
  "/:id",
  checkAuth,
  (req, res, next) => {
  Product.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Product deleted!" });
  });
});

module.exports = router;