require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")
const Controller = require('./controllers/controller')
const authentication = require("./middleware/authentication")


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.post('/register', Controller.register)
app.post('/login', Controller.login)
app.get('/seasonAnime', authentication, Controller.getSeasonAnime)
app.get('/getAnime', authentication, Controller.getAnime)
app.post('/addFavorite', authentication, Controller.addFavoriteAnime)
app.patch('/favorites/:id', authentication, Controller.updateFavoriteanime)
app.get('/favorites', authentication, Controller.getallFavoriteAnime)
app.delete('/favorites/:id', authentication, Controller.deleteFavoriteAnime)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})