const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const {email, password, firstName, lastName, phoneNumber, street, streetNumber, city, postalCode, country } = req.body

  try {

    user = new User({
      email,
      firstName,
      lastName,
      phoneNumber,
      street,
      streetNumber,
      postalCode,
      city,
      country
    });

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, process.env.JWT_KEY, {expiresIn: 25000}, (err, token) => {
      if (err) throw err
      res.status(200).json({
        succes: true,
        message: 'created account',
        token
      })
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({
      success: false,
      message: 'couldn\'t create account',
    })
  }
})



router.post("/login", async (req, res, next) => {
  let fetchedUser;
  try {
    const user = await User.findOne({ email: req.body.email })
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }

      const passwordMatches = await bcrypt.compare(req.body.password, user.password)
      if(!passwordMatches) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect Password!'
        })
      }

      const payload = {
        user: {
          id: user.id
        }
      }

      console.log(payload);

      jwt.sign(payload, process.env.JWT_KEY, {expiresIn: 25000}, (err, token) => {
        if(err) throw err
        res.status(200).json({
          token,
          expiresIn: 25000
        })
      }
    )
  } catch (e) {
    console.error(e)
    res.status(500).json({
      success: false,
      message: 'something went wrong logging ing'
    })
  }
})


module.exports = router;