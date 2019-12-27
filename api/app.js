const express = require('express')
const cors = require('cors')
const app = express()
const port = 9000

const ticks = require('./routes/ticks.js')

app.use('/', ticks) // can rename enpoint

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
