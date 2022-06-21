const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(require('./routers/operator'))
app.use(require('./routers/player'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})