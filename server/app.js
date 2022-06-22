const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})