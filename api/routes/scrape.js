const express = require('express');
const router = express.Router();
const apiKey = require('./apiKey');
const axios = require('axios');

var tickObj = {
  name: '',
  date: '',
  grade: '',
}

function getUser(user) {
  return axios.get('https://www.mountainproject.com/data/get-user?', {
    params: {
      userId: user,
      key: apiKey.apiKey
    }
  })
    .then((response) => {
      // return response.data.name;
      return response.data;
    })
}

function getTicks(user) {
  return axios.get('https://www.mountainproject.com/data/get-ticks?', {
    params: {
      userId: user,
      key: apiKey.apiKey,
      startPos: 115
    }
  })
    .then((response) => {
      for (tick of response.data.ticks){
        // console.log(tick.routeId);
        axios.get('https://www.mountainproject.com/data/get-routes?', {
          params: {
            routeIds:  tick.routeId,
            key: apiKey.apiKey
          }
        })
          .then((response) => {
            tick.routeId = response.data.routes[0].name
            console.log(tick)
            // return response.data.ticks
          })
      }
      return response.data.ticks
    })
  // return response.tick
}

router.get('/', function(req, res, next) {
  userList = [
    '108543839', // kevin
    // '12117', // sirius
    // '200432149' // chris
  ];
  // var aResponse = userList.map(getUser);
  var bResponse = userList.map(getTicks);
  Promise.all(bResponse)
    .then(responses=>{
      // responses = JSON.stringify(responses, null, 2);
      // console.log(bResponse);
      // console.log('resp ' + JSON.stringify(responses, null, 2));
      console.log('resp ' + JSON.stringify(bResponse, null, 2));

      res.render('scrape', {
        userList: userList,
        responses: responses
      });

    });
});

module.exports = router;
