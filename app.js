'use strict'
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')
const router = require('./routers/router')
const error_handler = require('./midlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(error_handler)

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})