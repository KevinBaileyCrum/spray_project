// import libraries
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = 9000

// import db models
const {User} = require('./models/user')

// import endpoints
const ticks = require('./routes/ticks.js')

// env
const DATABASE_URL= 'mongodb://localhost/test'
// app.use(cors({
//     origin: 'localhost:3000'
// }))
app.use(cors())

// connnect to databse
// mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('connected to database'))

// tutorial blog
// app.post('/user', (req, res) => {
//     const user = new User({
//         email: req.body.email,
//         password: req.body.password
//     }).save((err, response) => {
//         if(err) res.status(400).send(err)
//         res.status(200).send(response)
//     })
// })

app.get('/user', (req, res) => {
    res.send('hello')
})

// route endpoints
app.use('/', ticks)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
