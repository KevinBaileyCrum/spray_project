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
   passport.authenticate('local', {
      // successRedirect:'/',
      // failureRedirect:'/users/login',
      // failureFlash: true
   })
   console.log('logged in')
   // (req, res, next){
   //    console.log('logged in')
   // }
})

// logout
// router.get('/logout', function(req, res){
//   req.logout()
//   req.flash('success', 'You are logged out')
//   res.redirect('/users/login')
// })

module.exports = router
