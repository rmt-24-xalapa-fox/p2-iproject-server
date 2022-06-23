const axios = require("axios");
const { generateConfig } = require("../helpers/generateConfig");
const nodemailer = require("nodemailer");
const CONSTANTS = require("../config/const");
const { google } = require("googleapis");
const { Post, User, } = require("../models/index.js")
const { tokenToPayload } = require("../helpers/jwt");
require("dotenv").config();
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
class EmailController {


  static async getUser(req, res) {
    try {
      const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
      const { token } = await oAuth2Client.getAccessToken();
      const config = generateConfig(url, token);
      const response = await axios(config);
      res.json(response.data);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async getDrafts(req, res) {
    try {
      const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
      const { token } = await oAuth2Client.getAccessToken();
      const config = generateConfig(url, token);
      const response = await axios(config);
      res.json(response.data);
    } catch (error) {
      console.log(error);
      return error;
    } const fs = require('fs');
    const readline = require('readline');
    const { google } = require('googleapis');

  }

static async getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

      static async sendMail(req, res) {
  try {
    const targetEmail = req.target.email;
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        ...CONSTANTS.auth,
        accessToken: accessToken,
      },
    });
    let mailoptions = {
      from: "Ferdi &lt;ferdinandus.renaldi@gmail.com>",
      to: targetEmail,
      subject: "Gmail Login to NodeJS",
    }
    const mailOptions = {
      mailoptions,
      text: "You are signed into vue web app",
    };

    const result = await transport.sendMail(mailOptions);
    console.log(result);
    console.log("EMAIL is sent")
  } catch (error) {
    console.log(error);
    // next(error);
  }
}

      static async readMail(req, res) {
  try {
    const url = `https://gmail.googleapis.com//gmail/v1/users/ferdinandus.renaldi@gmail.com/messages/${req.params.messageId}`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);

    let data = await response.data;

    res.json(data);
  } catch (error) {
    console.log(error);
  }
}

}

module.exports = EmailController