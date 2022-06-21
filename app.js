const express = require('express')
const app = express()
const routes = require('./routes/index')
const { errorHandling } = require('./middleware/errorHandling')
const cors = require('cors')
require('dotenv').config()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/', routes)

app.use(errorHandling)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//npx sequelize model:create --name Player --attributes name:string,year:string,overall:integer,description:string,TeamId:integer,PositionId:integer,CategoryId:integer,
//npx sequelize model:create --name Team --attributes name:string,imgUrl:string
//npx sequelize model:generate --name CardUser --attributes PlayerId:integer,UserId:integer,status:string
