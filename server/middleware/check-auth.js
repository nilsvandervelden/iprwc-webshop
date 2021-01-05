const jwt = require("jsonwebtoken");
const User = require("../models/user")

module.exports = async function (req, res, next) {
  const token = req.header('token')
  console.log(req);
  if (!token) return res.status(401).json({ succes: false, message: "couldn't authenticate" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const user = await User.findById(decoded.user.id).catch(e=>{return res.status(500).send({ message: 'Invalid Token' })})
    req.user = user
    req.user.id = decoded.user.id
    next()
  } catch (e) {
    // console.error(e)
    res.status(500).send({ message: 'Invalid Token' })
  }
}