require("dotenv").config();

const Sequelize = require('sequelize');
sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routers')
const port = 3000
const errorHandler = require("./middlewares/error");

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use('/', router);
app.use(errorHandler);
app.listen(process.env.PORT || port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
module.exports = app