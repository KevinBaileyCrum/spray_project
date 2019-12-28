const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = 9000

// import endpoints
const ticks = require('./routes/ticks.js')

// connnect to databse
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const DATABASE_URL= 'mongodb://localhost/test'
mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))
console.log(db)

// route endpoints
app.use('/', ticks) // can rename enpoint

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
