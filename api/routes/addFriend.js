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

router.get('/', async(req, res) => {
   const mpId = req.query.mpId
   const sprayName = req.query.sprayName
   console.log(req.query)
   try {
      axios.get('https://www.mountainproject.com/data/get-user?', {
         params: {
            userId: mpId,
            key: apiKey.apiKey
         }
      })
         .then((response) => {
            console.log(response.data)
            if (!response.data) {
               return res.status(400).send('Invalid User Id')
            } else {
               var Friend = new FriendObj()
               Friend.mpid = response.data.id
               Friend.name = response.data.name
               Friend.avatar = response.data.avatar
               Friend.location = response.data.location
               Friend.about = response.data.otherInterests
               console.log(Friend)
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

router.post('/', async(req, res) => {
   const mpId = req.body.mpId // friend mpId
   const sprayName = req.body.sprayName
   console.log(req.body)
   try {
      let user = await User.findOneAndUpdate(
         { sprayName: sprayName},
         { $push: { friendsList: mpId } },
      )
      return
   } catch (error) {
      console.log(error)
      return res.status(401).send(error)
   }

})

module.exports = router
