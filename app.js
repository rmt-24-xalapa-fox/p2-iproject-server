const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")
const authentication = require("./middleware/authentication")
const Controller =require('./controllers/controller')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))




app.post('/addFavorite', authentication, Controller.addFavoriteAnime)
app.patch('/favorites/:id', authentication, Controller.updateFavoriteanime)
app.get('/favorites', authentication, Controller.getallFavoriteAnime)
app.delete('/favorites/:id', authentication, Controller.deleteFavoriteAnime)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})