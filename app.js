const cors = require("cors")
require("dotenv").config()
const express = require("express")
const { handleError } = require("./middleware/errorHandler.js")
const app = express()
const port = 3000
const router = require("./routers/index.js")

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/' , router)

app.use((err, req, res, next) => {
    handleError(err, req, res, next)
})

app.listen(port, () => {
    console.log(`This program is running`, port);
}) 