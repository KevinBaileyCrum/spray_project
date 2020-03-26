// TODO add middleware to post request when ready
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

router.post('/', async(req, res) => {
   const mpId = req.body.mpId
   const sprayName = req.body.sprayName
   try {
      // console.log(req.body)
      // let newFriend = await User.findOneAndUpdate(
      //    { sprayName: sprayName},
      //    { $push: { friendsList: mpId } },
      // )
      // if (!newFriend) {
      //    return res.status(401).send('invalid input')
      // } else {
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
                  Friend.name = response.data.name
                  Friend.avatar = response.data.avatar
                  Friend.location = response.data.location
                  console.log(Friend)
                  return res.status(200).send(Friend)
               }
            })
            .catch((error) => {
               console.log('axios error')
               console.log(error)
            })
      // }
   } catch (error) {
      return res.status(401).send(error)
   }
})

module.exports = router
