"use strict"
// require("dotenv").config()
const cors = require("cors")
const errorHandler = require("./middlewares/errorHandler")
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const router = require("./routes/index")


app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
app.use(errorHandler)

app.listen(port,() => {
    console.log(`Listening to port ${port}`);
})