const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

// import db model
const User = require('../models/user')



router.get('/', function(req, res) {
   res.send('hello')
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
      mpId: mpId
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
               console.log('success')
               console.log(newUser)
            }
         })
      })
   })
   console.log('new user biatch')
})

module.exports = router
