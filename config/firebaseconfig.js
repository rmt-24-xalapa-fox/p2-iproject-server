const firebase = require('firebase-admin');

// const firebaseConfig = {
//     apiKey: "AIzaSyC-3oiyQY3k0FdKnbu2-WiNMy0_kR0IvJE",
//     authDomain: "chat-app-yoga.firebaseapp.com",
//     projectId: "chat-app-yoga",
//     storageBucket: "chat-app-yoga.appspot.com",
//     messagingSenderId: "553639271253",
//     appId: "1:553639271253:web:1703ed73b6b9b17002eddc",
//     measurementId: "G-ZBMPX8C1BD"
// };

let serviceAccount = require("../serviceAccountFirebase/chat-app-yoga-firebase-adminsdk-c6zfb-061214ae95.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});
const db = firebase.firestore();
module.exports = {db};