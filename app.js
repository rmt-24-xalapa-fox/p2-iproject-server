`use strict`;
require(`dotenv`).config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require(`cors`);
const bodyParser = require('body-parser')


app.set(`view engine`, `ejs`);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());
// app.get('/', (req, res) => {
//   // res.send('Hello World!')
//   res.status(200).json({message:'halo'})
// })

app.use("/", require("./routes"));

app.listen(port, () => { // ====================================== sekarang pakai bin/www utk development
    console.log(`Example app listening on port ${port}`);
});

// module.exports = app