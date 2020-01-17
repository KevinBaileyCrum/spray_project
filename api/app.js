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
const register = require('./routes/register.js')

// env
const DATABASE_URL= 'mongodb://localhost/test'
// app.use(cors({
//     origin: 'localhost:3000'
// }))
app.use(cors())

// connnect to databse
mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

// route endpoints
app.use('/ticks', ticks)
app.use('/register', register)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
