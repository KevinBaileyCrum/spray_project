const express = require('express');
const router = express.Router();
const apiKey = require('./apiKey');
const axios = require('axios');

function getUserTick(user) {
  axios.get('https://www.mountainproject.com/data/get-user?', {
    params: {
      userId: user,
      key: apiKey.apiKey
    }
  })
    .then((response) => {
      // console.log(response.data.name)
      return response.data.name;
    })
}

router.get('/', function(req, res, next) {
  userList = [
    '108543839', // kevin
    '12117', // sirius
    '200432149' // chris
  ];
  var aResponse = [];
  // userList.forEach(element => getUserTick(element));
  userList.forEach(element => {
    aResponse.push(getUserTick(element));
    console.log(element);
  })
  res.render('scrape', {
    userList: userList,
    aResponse: aResponse
  });
});

module.exports = router;
