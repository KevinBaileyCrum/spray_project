const util = require('util')
const chai = require('chai')
const axios = require('axios');

const URL = 'http://localhost:9000'
chai.should()

// test ger url
axios.get(URL+'/login')
   .then(response => {
      response.status.should.be.equal(200)
   })
   .catch(err => {
      console.log(err)
   })

// test invalid user
axios.post(URL+'/login', {
   email: 'invalid@no',
   password: 'no'
})
   .then(response => {
      // console.log(response.data)
      response.status.should.be.equal(401)
      response.data.should.equal('invalid ser')
   })
   .catch(err => {
         err.response.status.should.be.equal(401)
         err.response.data.should.equal('invalid user')
   })

// test login
axios.post(URL+'/login', {
   email: 'abc@abc',
   password: 'abc'
})
   .then(response => {
      console.log('login test res ' + JSON.stringify(response.data))
      util.inspect(response)
   })
   .catch(err => {
      console.log(err)
      util.inspect(err)
   })
