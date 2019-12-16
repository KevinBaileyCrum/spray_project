// ticks.js
const express = require('express')
const router = express.Router()
const axios = require('axios')
const apiKey = require('./apiKey')

function TickObj(
    userName = null, // getUser api
    routeId = null,  // tick api vvv
    date = null,
    style  = null,
    notes = null,
    stars = null,
    routeName = null, // route api vvv
    routeGrade = null
){
    this.userName = userName
    this.routeGrade = routeName
    this.routeId = routeId
    this.date = date
    this.style = style
    this.notes = notes
    this.stars = stars
    this.routeName = routeName
    this.routeGrade = routeGrade
}

mpApiGetTicks = async (userId) => {
    try {
        await axios.get('https://www.mountainproject.com/data/get-ticks?', {
            params: {
                userId: userId,
                key: apiKey.apiKey,
                startPos: 115
            }
        })
        .then((response) => {
            console.log('axios here')
            // console.log(response.data)
            return response.data.ticks
        })
    } catch (error) {
        console.error(`mpApiGetTicks axios error ${error}`)
    }
}

const getTicks = async (userId) => {
    console.log(userId)
    console.log('there')
    const mpTicksRes = await mpApiGetTicks(userId)
    if (mpTicksRes) {
        // console.log(`mpTicksRes ${mpTicksRes}`)
        return mpTicksRes
    }
}

router.get('/', function(req, res) {

    // assuming already have userID
    // for friend in friend list
    //   getTicks(listOfTickObjs)
    //   for ticks in listOfTickObjs
    //     getRoute info on tick

    var friendList = ['108543839'] // kevin
    var TickList = []
    getTicks(friendList[0]).then((response) => {
        console.log('here')
        res.send(response)
    })
})

module.exports = router
