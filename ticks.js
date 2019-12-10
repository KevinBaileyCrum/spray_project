// ticks.js
const express = require('express')
const router = express.Router()
const apiKey = require('./apiKey')

router.get('/', function(req, res, next) {
  console.log('nodemon test')
  console.log(apiKey.apiKey)
  res.send('ticks endpoit')
})

module.exports = router
