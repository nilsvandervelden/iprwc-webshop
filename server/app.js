const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const productsRoutes = require("./routes/products")

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
});

app.use("/api/products", productsRoutes);

module.exports = app;