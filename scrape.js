// https://buttercms.com/blog/web-scraping-with-nodejs-and-cheerio
// for using axios and cheerio
const axios = require('axios')
const cheerio = require('cheerio')

axios.get('https://www.mountainproject.com/user/108543839/kevin-crum/ticks').then((response) => {
  // console.log(response.data)
  const $ = cheerio.load(response.data)
})
