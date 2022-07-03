"use strict";
// require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
    console.log('App is working at port:', port);
});

