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
        }const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  authorize(JSON.parse(content), listFiles);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
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

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  });
}
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
          console(result);
        } catch (error) {
          console.log(error);
          res.send(error);
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
          res.send(error);
        }
      }

}

module.exports = EmailController