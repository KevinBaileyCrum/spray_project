const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// import db model
const User = require('../models/user')

// import jwt secret
const JWT_SECRET = require('./jwtConfig')

router.get('/', function(req, res) {
   res.send('hello ' + JSON.stringify(JWT_SECRET.secret))
})

router.post('/', function(req, res) {
   console.log(req.body)
   const sprayName = req.body.sprayName
   const email = req.body.email
   const password = req.body.password
   const mpId = req.body.mpId

   let newUser = new User({
      sprayName: sprayName,
      email: email,
      password: password,
      mpId: mpId,
      friendsList: []
   })

   bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
         if (err){
            console.log(err)
         }
         newUser.password = hash
         newUser.save(function(err){
            if (err){
               console.log(err)
               if (err.code === 11000){
                  console.log('dup key found')
                  res.status(401).send('acount already exists with that email')
               }
               return
            } else {
               res.status(200).send('success redirecting to login')
            }
         })
      })
   })
})

module.exports = router
