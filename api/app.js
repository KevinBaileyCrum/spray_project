// import libraries
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

// express
const app = express()

// parse frontend requests
app.use(bodyParser.urlencoded({
   extended: true
}))
app.use(bodyParser.json());

// import db models
const {User} = require('./models/user')

// initialize passport as middleware
require('./routes/passport.js')(passport)
app.use(passport.initialize())
app.use(passport.session())

// import endpoints
const ticks = require('./routes/ticks.js')
const register = require('./routes/register.js')
const login = require('./routes/login.js')

// env
const port = 9000
const DATABASE_URL= 'mongodb://localhost/test'
app.use(cors())

// connnect to databse
mongoose.connect(DATABASE_URL, {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

// route endpoints
app.use('/ticks', ticks)
app.use('/register', register)
app.use('/login', login)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
