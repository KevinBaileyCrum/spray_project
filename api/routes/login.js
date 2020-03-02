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
// router.post('/', function(req, res, next){
//    console.log('login post')
//    // passport.authenticate('local', (err, user, info) => {
//       console.log('req')
//       console.log(req)
//       if (err) {
//          console.log('login err')
//          console.log(err)
//          res.status(401).send(err)
//          // return next(err)
//          return (err)
//       }

//       if (!user) {
//          console.log('login err 2')
//          return res.status(401).send('invalid user')
//       }

//       req.logIn(user, function(err) {
//          if (err) {
//             console.log('err')
//             console.log(err)
//             return next(err)
//          }
//          // console.log('i am real')
//          // console.log(req)
//          console.log('req '+ req)
//          console.log('info ' + info)
//          return res.status(200).send(user)
//       })

//    })(req, res, next)
//    console.log('logged in')
// })
router.post('/', async(req, res) => {
   const email = req.body.email
   const password = req.body.password
   try {
      console.log(req.body)
      const user = await User.findOne({email})
      if (!user) {
         return res.status(401).send('invalid user')
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
         return res.status(401).send('invalid password')
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET.secret, { expiresIn: 3600 })
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
