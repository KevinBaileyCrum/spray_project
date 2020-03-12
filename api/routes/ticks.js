// ticks.js
const express = require('express')
const router = express.Router()
const axios = require('axios')
const apiKey = require('./apiKey')

// import middleware
const auth = require('../middleware/auth')

function TickObj(
   userName = null, // getUser api
   routeId = null,  // tick api vvv
   date = null,
   style  = null,
   notes = null,
   stars = null,
   routeName = null, // route api vvv
   routeGrade = null,
   tickId = null
){
   this.userName = userName
   this.routeId = routeId
   this.date = date
   this.style = style
   this.notes = notes
   this.stars = stars
   this.routeName = routeName
   this.routeGrade = routeGrade
   this.tickId = tickId
}

mpApiGetRoutes = (routeId) => {
   console.log(routeId)
   try {
      return axios.get('https://www.mountainproject.com/data/get-routes?', {
         params: {
            routeIds: routeId,
            key: apiKey.apiKey
         }
      })
         .then((response) => {
            // console.log(response.data.routes)
            return response.data.routes
         })
   } catch (error) {
      console.error(`mpApiGetRoutes axios error ${error}`)
   }
}

mpApiGetTicks =  (userId) => {
   try {
      return axios.get('https://www.mountainproject.com/data/get-ticks?', {
         params: {
            userId: userId,
            key: apiKey.apiKey,
            startPos: 115
         }
      })
         .then((response) => {
            console.log('axios here')
            return response.data.ticks
         })
   } catch (error) {
      console.error(`mpApiGetTicks axios error ${error}`)
   }
}

const getTicks =  (userId) => {
   return mpApiGetTicks(userId).then(mpTicksRes=>{
      var tickList = []
      // console.log(`mpTicksRes ${mpTicksRes}`)
      for (res in mpTicksRes){
         var tick = new TickObj()
         // console.log(mpTicksRes[res])
         tick.routeId = mpTicksRes[res].routeId
         tick.date = mpTicksRes[res].date
         tick.style = mpTicksRes[res].style
         tick.notes = mpTicksRes[res].notes
         tick.stars = mpTicksRes[res].userRating
         tick.tickId = mpTicksRes[res].tickId

         // console.log(tick)
         tickList.push(tick)
      }
      // console.log(`ticklist test ${tickList}`)
      // return mpTicksRes
      // return tickList
      routes=tickList.map(tick=>mpApiGetRoutes(tick.routeId))
      return Promise.all(routes).then(results=>{
         //_.zip(results,tickList).forEach((t)
         for (route in results){
            mpRoutesRes=results[route]
            tickList[route].routeName = mpRoutesRes[0].name
            tickList[route].routeGrade = mpRoutesRes[0].rating
         }
         return tickList
      })
   })
}

router.get('/', auth, function(req, res) {

   // assuming already have userID
   // for friend in friend list
   //   getTicks(listOfTickObjs)
   //   for ticks in listOfTickObjs
   //     getRoute info on tick

   var friendList = ['108543839'] // kevin
   getTicks(friendList[0]).then((response) => {
      console.log('here')
      res.send(response)
   }).catch(console.log)
})

module.exports = router

