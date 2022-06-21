require("dotenv").config()
const cors = require("cors")
const express = require("express")
const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded( { extended:false }))
app.use(express.json())
app.use('/', require("./routes"))

app.listen( port , _ => {
  console.log('App run in port', port);
} )
