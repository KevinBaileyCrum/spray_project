const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// import db model
const User = require('../models/user')

// import jwt secret
const JWT_SECRET = require('./jwtConfig')

// Login
router.get('/', function(req, res) {
   res.send('this is hello login')
})

// Login Process
router.post('/', async(req, res) => {
   const email = req.body.email
   const password = req.body.password
   try {
      const user = await User.findOne({email})
      if (!user) {
         return res.status(401).send('invalid user')
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
         return res.status(401).send('invalid password')
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET.secret, { expiresIn: '7d' })
      if (!token) throw Error('could not sign token')

      res.status(200).json({
         token,
         user: {
            id: user._id,
            sprayName: user.sprayName,
         }
      })
   } catch (e) {
      res.status(400).json({ msg: e.message })
   }
})

module.exports = router
