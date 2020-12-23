const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const Product = require("./models/product");
const product = require("./models/product");

const app = express();

mongoose.connect("mongodb+srv://Nils:5yMFKYu5c14X6qJi@cluster0.q4xcf.mongodb.net/'node-angular'?retryWrites=true&w=majority")
.then(client => {
  console.log('Connected to database!');
})
.catch(err => {
  console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");

  next();
})

app.post("/api/products", (req, res, next ) => {
  const product = new Product({
    vinylFigureId: req.body.vinylFigureId,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imagePath: req.body.imagePath
  });
  product.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.put("/api/products/:id", (req, res, next) => {
  console.log(req.body);
  const product = new Product({
    _id: req.body.id,
    vinylFigureId: req.body.vinylFigureId,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imagePath: req.body.imagePath
  });
  Product.updateOne({ _id: req.params.id }, product).then(result => {
    console.log(result);
    res.status(200).json({message: "Update successful!" });
  });
});

app.get("/api/products", (req, res, next) => {
  Product.find()
    .then(documents => {
      res.status(200).json({
        message: 'Products fetched successfully!',
        products: documents
      });
    });
});

app.get("/api/products/:id"), (req, res, next) => {
  Product.findById(req.params.id).then(product => {
    if (product) {
      res.status(200).json({product})
    } else {
      res.status(404).json({message: 'Product not found!'});
    }
  })
}

app.delete("/api/products/:id", (req, res, next) => {
  Product.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Product deleted!" });
  });
});

module.exports = app;