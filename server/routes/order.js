const express = require("express");

const Product = require("../models/product");
const ProductOrder = require("../models/productOrder");
const Order = require("../models/order");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("", async (req, res, next) => {
  try {
    const product = await global.models('Order').find().sort([['createdAt', -1]])
    res.json(await product)
  } catch (e) {
    res.send({ success: false, message: 'couldnt fetch order' })
  }
});

router.get("/:id", async (req, res, next) => {
  ProductOrder.findById(req.params.id).then(order => {
    if (order) {
      res.status(200).json(order)
    } else {
      res.status(404).json({message: 'Order not found!'});
    }
  });
});

router.post("", (req, res, next ) => {
  console.log(req.body);
  const token = req.headers.authorization.substr(req.headers.authorization.indexOf(" ") + 1);
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
      const product = Product.findById(orderProducts[i].productId);
        const productOrder = new ProductOrder({
          vinylFigureId: product.vinylFigureId,
          name: product.name,
          price: product.price,
          description: product.description,
          imagePath: product.imagePath,
          amount: orderProducts[i].amount
        });
        productDocuments.push(productOrder)
      }

      const order = new Order({
        orderProducts: productDocuments,
        userId: token,
        createdAt: Date.now()
      })

      console.log(order)
        
  //     order.save().catch(e =>{
  //       console.log(e)
  //       return res.send({
  //         success: false,
  //         message: 'couldnt create order' 
  //       })
  //     })
  //     res.json(order)
  } catch (e) {
  // console.log(e)
  // return res.send({ success: false, message: 'couldnt create order' })
  }
})

router.delete("/:id", checkAuth, async (req, res, next) => {
  try {
    const order = await global.models('Order').findById(req.params.orderId)
    order.deleteOne()
    res.json(await order)
  } catch (e) {
    res.send({ success: false, message: 'couldnt fetch order' })
  }
})

router.get('/:id', checkAuth, async (req, res, next) => {
  try {
    const order = await global.models('Order').findById(req.params.orderId)
    if(req.user.id !==  order.userId) return res.status(401).json({success: false, message: 'thats not your order'})
    const user = await global.models('User').findById(order.userId)
    res.json({
       user, order
    })
  } catch (e) {
    res.status(400).json({ success: false, message: 'couldnt fetch order' })
  }
})

router.patch('/:id', checkAuth, async (req, res, next) => {
  const orderId = req.params.orderId
  if (!orderId) { return res.status(400).json({ success: false, message: 'your forgot to give the order id' }) }
  try {
      const order = await global.models('Order').findById(orderId)
      await order.updateOne({
          delivered: !order.delivered
      })
      await order.save()
      res.json(await order)
  } catch (e) {
      console.log(e)
      res.send({ success: false, message: 'couldnt update order' })
  }
})

router.patch('/:id', checkAuth, async (req, res, next) => {
  const orderId = req.params.orderId
  if (!orderId) { return res.status(400).json({ success: false, message: 'your forgot to give the order id' }) }
  try {
      const order = await global.models('Order').findById(orderId)
      await order.updateOne({
              paid: !order.paid
      })
      await order.save()
      res.json(await order)
  } catch (e) {
      console.log(e)
      res.send({ success: false, message: 'couldnt update order' })
  }
})

module.exports = router;