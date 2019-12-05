const express = require('express');
const router = express.Router();
const apiKey = require('./apiKey');
const axios = require('axios');

function getUserTick(user) {
  return axios.get('https://www.mountainproject.com/data/get-user?', {
    params: {
      userId: user,
      key: apiKey.apiKey
    }
  })
    .then((response) => {
      return response.data.name;
    })
}

router.get('/', function(req, res, next) {
  userList = [
    '108543839', // kevin
    '12117', // sirius
    '200432149' // chris
  ];
  var aResponse = userList.map(getUserTick);
  Promise.all(aResponse)
    .then(responses=>{
      console.log(responses);
      res.render('scrape', {
        userList: userList,
        responses: responses
      });

    });
});

module.exports = router;
