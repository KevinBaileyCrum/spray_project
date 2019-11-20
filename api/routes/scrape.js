const express = require('express');
const router = express.Router();
const apiKey = require('./apiKey');
const axios = require('axios');

// // https://buttercms.com/blog/web-scraping-with-nodejs-and-cheerio
// // for using axios and cheerio
//p,tp const cheerio = require('cheerio')

// axios.get('https://www.mountainproject.com/user/108543839/kevin-crum/ticks').then((response) => {
//   // console.log(response.data)
//   const $ = cheerio.load(response.data)
//   const ticksHTML = $('tr.route-row')
//   for (let i=0; i<ticksHTML.length; i++){
//     const ticksStrong = $(ticksHTML[i]).find('strong')[0]
//     if (ticksStrong) {
//       const tickName = $(ticksStrong).text()
//       console.log(tickName)
//     }
//   }
// })

function getUserTick(user) {
  console.log('the user is');
  console.log(user);
  axios.get('https://www.mountainproject.com/data/get-user?', {
    params: {
      userId: user,
      key: apiKey.apiKey
    }
  })
    .then((response) => {
      console.log(response.data)
    })
}




router.get('/', function(req, res, next) {
  userList = [
    '108543839', // kevin
    '12117' // sirius
  ]
  var aResponse;

  // axios.get('https://www.mountainproject.com/data/get-ticks?', {
  //   params: {
  //     email: 'kevinbaileycrum@gmail.com',
  //     key: apiKey.apiKey
  //   }
  // })
  // .then((response) => {
    // console.log(response)
    // console.log(response.data)
  // })

  userList.forEach(element => getUserTick(element));
  res.render('scrape');
  // res.render(response.data);
});

module.exports = router;
