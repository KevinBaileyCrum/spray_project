const express = require('express')
const router = express.Router()
const axios = require('axios')

const User = require('../models/user')

router.get('/', async(req, res) => {
   const sprayName = req.query.sprayName
   try {
      const user = await User.findOne({sprayName})
      if (!user) {
         return res.status(401).send('you are not real')
      }
      let friendsList = user.friendsList
      return res.status(200).send(friendsList)
   } catch (error) {
      console.log(error)
      return res.status(401).send(error)
   }
})

module.exports = router
