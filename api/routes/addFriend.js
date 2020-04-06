// TODO add middleware to post request when ready
// 200432149
const express = require('express')
const router = express.Router()
const axios = require('axios')
const apiKey = require('./apiKey')

const User = require('../models/user')

function FriendObj(
   name = null,
   avatar = null,
   location = null
){
   this.name = name
   this.avatar = avatar
   this.location = location
}

// calls mountain project get user api for populating add friend card
router.get('/', async(req, res) => {
   const mpId = req.query.mpId
   const sprayName = req.query.sprayName
   try {
      axios.get('https://www.mountainproject.com/data/get-user?', {
         params: {
            userId: mpId,
            key: apiKey.apiKey
         }
      })
         .then((response) => {
            if (!response.data) {
               return res.status(400).send('Invalid User Id')
            } else {
               var Friend = new FriendObj()
               Friend.mpid = response.data.id
               Friend.name = response.data.name
               Friend.avatar = response.data.avatar
               Friend.location = response.data.location
               Friend.about = response.data.otherInterests
               return res.status(200).send(Friend)
            }
         })
         .catch((error) => {
            console.log('axios error')
            console.log(error)
         })
   } catch (error) {
      return res.status(401).send(error)
   }
})

// adding friend mpId to db
router.post('/', async(req, res) => {
   const mpId = req.body.params.mpId // friend mpId
   const sprayName = req.body.params.sprayName
   console.log(req.body)
   console.log(req.body.params.mpId)
   console.log(req.body.params.sprayName)
   console.log(req.body.params)

   try {
      const user = await User.findOneAndUpdate(
         { sprayName: sprayName},
         { $push: { friendsList: mpId } },
      )
      if (!user) {
         console.log('adding friend db error')
      }
      return res.status(200).send('friend added')
   } catch (error) {
      console.log(error)
      return res.status(401).send(error)
   }

})

module.exports = router
