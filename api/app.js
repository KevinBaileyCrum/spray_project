const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = 9000

// import endpoints
const ticks = require('./routes/ticks.js')

// connnect to databse
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const DATABASE_URL= 'mongodb://localhost/subscribers'
mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

// route endpoints
app.use('/', ticks) // can rename enpoint

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
