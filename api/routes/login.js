const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

// Login
router.get('/', function(req, res) {
   res.send('this is hello login')
})

// // Login Process
router.post('/', function(req, res, next){
   console.log('login post')
   passport.authenticate('local', (err, user, info) => {
      console.log('req')
      console.log(req)
      if (err) {
         console.log('login err')
         console.log(err)
         res.status(401).send(err)
         // return next(err)
         return (err)
      }

      if (!user) {
         console.log('login err 2')
         return res.status(401).send('invalid user?')
      }

      req.logIn(user, function(err) {
         if (err) {
            console.log('err')
            console.log(err)
            return next(err)
         }

         return res.status(200).send(user)
      })

   })(req, res, next)
   console.log('logged in')
})

module.exports = router
