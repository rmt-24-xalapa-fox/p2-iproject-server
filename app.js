"use strict"

if(process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}
// require('dotenv').config()
const cors = require("cors")
const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const app = express()

const routes = require('./routes')

const port = process.env.PORT ||    3000;

app.use(cors())

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(routes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})