// ticks.js
const express = require('express')
const router = express.Router()
const apiKey = require('./apiKey')

function TickObj(
  userName = null,
  routeName= null,
  routeGrade = null,
  date = null,
  style  = null,
  notes = null,
  stars = null
){
  this.userName = userName
  this.routeGrade = routeName
  this.routeGrade = routeGrade
  this.date = date
  this.style = style
  this.notes = notes
  this.starts = stars
}


router.get('/', function(req, res, next) {
  var tick = new TickObj()
  tick.routeName = 'Midnight Lightning'
  console.log(tick)
  res.send('ticks endpoit')
})

module.exports = router
