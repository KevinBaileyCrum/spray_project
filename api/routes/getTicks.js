// ticks.js
const express = require('express')
const router = express.Router()
const axios = require('axios')
const apiKey = require('./apiKey')

// import middleware
const auth = require('../middleware/auth')

function TickObj(
   userName = null, // getUser api
   userImg = null,
   routeId = null,  // tick api vvv
   date = null,
   style  = null,
   notes = null,
   stars = null,
   routeName = null, // route api vvv
   routeGrade = null,
   routeImg = null,
   tickId = null
){
   this.userName = userName
   this.userImg = userImg
   this.routeId = routeId
   this.date = date
   this.style = style
   this.notes = notes
   this.stars = stars
   this.routeName = routeName
   this.routeGrade = routeGrade
   this.routeImg = routeImg
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
         .catch((error) => {
            console.log('axios error mpApiGetRoutes ' + error)
         })
   } catch (error) {
      console.error(`mpApiGetRoutes axios error ${error}`)
   }
}

mpApiGetTicks =  (userId) => {
   try {
      console.log('mpApiGetTicks ' + userId)
      return axios.get('https://www.mountainproject.com/data/get-ticks?', {
         params: {
            userId: userId,
            key: apiKey.apiKey
         }
      })
         .then((response) => {
            console.log('axios here')
            console.log(response.data)
            return response.data.ticks
         })
         .catch((error) => {
            console.log('axios error mpApiGetTicks ' + error)
         })

   } catch (error) {
      console.error(`mpApiGetTicks axios error ${error}`)
   }
}

const getTicks = (userId, user) => {
   console.log('getTicks on ' + userId)
   return mpApiGetTicks(userId).then(mpTicksRes=>{
      var tickList = []
      for (res in mpTicksRes){
         var tick = new TickObj()
         tick.userName = user.userName
         tick.userImg = user.userImg
         tick.routeId = mpTicksRes[res].routeId
         tick.date = mpTicksRes[res].date
         tick.style = mpTicksRes[res].style
         tick.notes = mpTicksRes[res].notes
         tick.stars = mpTicksRes[res].userRating
         tick.tickId = mpTicksRes[res].tickId

         tickList.push(tick)
      }
      routes=tickList.map(tick=>mpApiGetRoutes(tick.routeId))
      return Promise.all(routes).then(results=>{
         for (route in results){
            mpRoutesRes=results[route]
            tickList[route].routeName = mpRoutesRes[0].name
            tickList[route].routeGrade = mpRoutesRes[0].rating
            tickList[route].routeImg = mpRoutesRes[0].imgSqSmall
         }
         return tickList
      })
   })
}

const getUser = async (mpId) => {
   return axios.get('https://www.mountainproject.com/data/get-user?', {
      params: {
         userId: mpId,
         key: apiKey.apiKey
      }
   })
      .then(response => {
         const user = {
            userName: response.data.name,
            userImg: response.data.avatar
         }
         console.log(user)
         return user
      })
      .catch(error => {
         console.log(response.error)
      })
}

router.get('/', async (req, res) => {
   const mpId = req.query.mpId
   console.log('ticks for ' + mpId)
   const user = await getUser(mpId)
   getTicks(mpId, user).then((response) => {
      console.log('then on getTicks ' + mpId)
      res.send(response)
   }).catch(console.log)
})

module.exports = router

