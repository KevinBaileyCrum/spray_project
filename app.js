const express = require('express')
const app = express()
const port = 3000

const ticks = require('./ticks.js')
const old = require('./old.js')

// app.get('/', (req, res) => res.send('Hello World!'))
app.use('/', ticks) // can rename enpoint
app.use('/old', old) // can rename enpoint

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
