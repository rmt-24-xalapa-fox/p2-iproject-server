const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors()); //! CORS HARUS MENJADI MIDDLEWARE PALING AWAL
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Listen on port: ${port}...`);
});
