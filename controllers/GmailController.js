const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
require('dotenv').config({ path: '../.env' })
var SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send'
];
const TOKEN_PATH = '../config/token.json';
const testToken = require('../config/token.json')
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize( callback,targetEmail) {
  const redirect_uris = process.env.REDIRECT
  const client_secret = process.env.CLIENT_SECRET
  const client_id = process.env.CLIENT_ID
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris);
    // console.log(oAuth2Client);

  // Check if we have previously stored a token.
  if(testToken && testToken!=""){
    oAuth2Client.setCredentials(testToken);
    callback(oAuth2Client,targetEmail);
  }else{
    return getNewToken(oAuth2Client, callback);
  }
//   fs.readFile(TOKEN_PATH, (err, token) => {
//       console.log(testToken);
//     if(err) 
    
//   });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
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
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function makeBody(to, from, subject, message) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');

    var encodedMail = new Buffer.from(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
        return encodedMail;
}

function sendMessage(auth,targetEmail) {
    var raw = makeBody(process.env.emailSender, targetEmail, 'User Registered', 'Thank you for registering at Insta Vue!');
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.send({
        auth: auth,
        userId: 'me',
        resource: {
            raw: raw
        }
    
    }, function(err, response) {
        console.log(err);
        return(err || response)
    });
}

function setTarget(targetEmail){
    authorize( sendMessage,targetEmail);
}

module.exports = setTarget
    