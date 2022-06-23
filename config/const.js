require("dotenv").config();

const auth = {
  type: "OAuth2",
  user: "ferdinandus.renaldi@gmail.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

let mailoptions = {
  from: "Ferdi &lt;ferdinandus.renaldi@gmail.com>",
  to: "ferdinandus.renaldi@gmail.com",
  subject: "Gmail Login to NodeJS",
};

module.exports = {
  auth,
  mailoptions,
};