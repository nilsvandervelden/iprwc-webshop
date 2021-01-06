const express = require("express");

const Product = require("../models/product");
const ProductOrder = require("../models/productOrder");
const Order = require("../models/order");
const User = require("../models/user");
const checkAuth = require("../middleware/check-auth");
const product = require("../models/product");

const router = express.Router();

router.get("/:id", checkAuth, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    if (req.user.id !== order.userId) return res.status(401).json({success: false, message: 'Thats not your order'})
    const user = await User.findById(order.userId)
    res.json({
      order
      ,user
    })
  } catch (e) {
    res.status(400).json({succes: false, message: 'couldnt fetch order' })
  }
})

router.get("", (req, res, next) => {
  Order.find().populate("ProductOrder").lean().then(documents => {
    res.status(200).json({
      message: 'Orders fetched successfully!',
      orders: documents
    });
  });
});

router.post("", checkAuth, async (req, res, next ) => {
  const { orderProducts } = req.body
  if(orderProducts.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'your forgot to give an array of orderProducts with id/amount' 
    })
  }
  if (!orderProducts || !orderProducts.length === 0) { 
    return res.status(400).json({
    success: false,
    message: 'your forgot to give an array of orderProducts with id/amount' 
    }) 
  }

  try {
    const productDocuments = []
    for (let i = 0; i < orderProducts.length; i++ ) {

      const product = await orderProducts[i];
        const productOrder = await new ProductOrder({
          productId: product.productId,
          vinylFigureId: product.vinylFigureId,
          name: product.name,
          price: product.price,
          description: product.description,
          imagePath: product.imagePath,
          amount: product.amount
        });
        productOrder.save()
        productDocuments.push(await productOrder)
      }

      const order = await new Order({
        products: productDocuments,
        userId: req.user.id,
        createdAt: Date.now()
      })

      await order.save().catch(e =>{
        console.log(e)
        return res.send({ success: false, message: 'couldnt create order' })
      })
      res.json(await order)
    } catch (e) {
      console.log(e)
      return res.send({ success: false, message: 'couldnt create order' })
    }
  })

module.exports = router;