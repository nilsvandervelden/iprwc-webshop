const express = require("express");

const ProductOrder = require("../models/productOrder");
const checkAuth = require("../middleware/check-auth")

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

router.post("", async (req, res, next ) => {
  const { products } = req.body
  if(products.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'your forgot to give an array of products with id/amount' 
    })
  }
  if (!products || !products.length === 0) { 
    return res.status(400).json({
    success: false,
    message: 'your forgot to give an array of products with id/amount' 
    }) 
  }
  try {
    const productDocuments = []
    for (let i = 0; i < products.length; i++ ) {
      const product = await global.models('Product').findOne({
        vinylFigureId: products[i].vinylFigureId
      })

      const productOrder = await new global.models('ProductOrder')({
        vinylFigureId: product.vinylFigureId,
        name: product.name,
        price: product.price,
        description: product.description,
        imagePath: product.imagePath,
        amount: products[i].amount
      });
      productDocuments.push(await productOrder)
    }

    const order = await new global.models('Order')({
      products: productDocuments,
      userId: req.user.id,
      createdAt: Date.now()
    })
      
    await order.save().catch(e =>{
      console.log(e)
      return res.send({
        success: false,
        message: 'couldnt create order' 
      })
    })
    res.json(await order)
  } catch (e) {
  console.log(e)
  return res.send({ success: false, message: 'couldnt create order' })
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