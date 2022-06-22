require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3030

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', require('./routes/index'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})