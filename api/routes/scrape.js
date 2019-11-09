var express = require('express');
var router = express.Router();
var apiKey = require('./apiKey');
const axios = require('axios')

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

router.get('/', function(req, res, next) {
  axios.get('https://www.mountainproject.com/data/get-ticks?', {
    params: {
      email: 'kevinbaileycrum@gmail.com',
      key: apiKey.apiKey
    }
  })
  .then((response) => {
    // console.log(response)
    // console.log(response.data)
    console.log(apiKey.apiKey)
  })
  res.render('scrape');
});

module.exports = router;
