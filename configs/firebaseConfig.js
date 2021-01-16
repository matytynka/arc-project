const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/storage');
require('dotenv').config();

const config = {
    apiKey: "AIzaSyC9oacyibLG0pD9zGUL2E32EcOiYPHPFJI",
    authDomain: "arc-project-bf6c3.firebaseapp.com",
    projectId: "arc-project-bf6c3",
    storageBucket: "arc-project-bf6c3.appspot.com",
    messagingSenderId: "646615307296",
    appId: "1:646615307296:web:a90d209162631dc835d845",
    measurementId: "G-41CP1DRSQK"
}

firebase.default.initializeApp(config);

const auth = firebase.auth();
const storage = firebase.storage();

exports.firebase = firebase;
exports.auth = auth;
exports.storage = storage;