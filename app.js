const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

// app.use(cors()); //! CORS HARUS MENJADI MIDDLEWARE PALING AWAL
app.use(
  cors({
    origin: "https://instalite-590a5.web.app",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./routes/index"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listen on port: ${port}...`);
});
