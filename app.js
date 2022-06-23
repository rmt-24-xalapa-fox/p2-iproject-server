require("dotenv").config();
const axios = require('axios')
const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000
const apiKey = process.env.API_KEY

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/heroes', async (req, res) => {
  try {
    const heroes = await axios.get('https://api.dazelpro.com/mobile-legends/hero')
    res.status(200).json(heroes.data)
  } catch (err) {
    console.log(err);
  }
})

app.get('/avatars', async (req, res) => {
  try {
    const avatars = await axios.get('https://klapyssbezecscyzrajq.supabase.co/rest/v1/Avatars2?select=*', {
      headers: {
        apikey: apiKey
      },
    })

    res.status(200).json(avatars.data)
  } catch (err) {
    console.log(err);
  }
})

app.get('/hero/:id', async (req, res) => {
  try {
    const hero = await axios.get(`https://api.dazelpro.com/mobile-legends/hero/${req.params.id}`)

    if (!hero) {
      throw { name: "notFound" }
    }

    res.status(200).json(hero.data)
  } catch (err) {
    console.log(err);
  }
})

app.get('/detailImage/:id', async (req, res) => {
  try {
    const image = await axios.get(`https://klapyssbezecscyzrajq.supabase.co/rest/v1/Detail Hero Images?id=eq.${req.params.id}&select=*`, {
      headers: {
        apikey: apiKey
      }
    })

    res.status(200).json(image.data)
  } catch (err) {
    console.log(err);
  }
})

app.use((err, req, res, next) => {
  let code = 500
  let msg = "Internal Server Error"
  const { name } = err

  if (name === "notFound") {
    code = 404
    msg = "Hero Not Found"
  }

  res.status(code).json({
    message: msg
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})