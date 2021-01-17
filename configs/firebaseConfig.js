const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/storage');
require('dotenv').config();

const config = {
    apiKey: "AIzaSyBej7avmilxkqcE-JBtGpp4FwlQghhAixw",
    authDomain: "arc-project-302014.firebaseapp.com",
    projectId: "arc-project-302014",
    storageBucket: "arc-project-302014.appspot.com",
    messagingSenderId: "912268063152",
    appId: "1:912268063152:web:7847f9a0343fbfa4b9a675",
    measurementId: "G-PXJYX2NQ5N"
}

firebase.default.initializeApp(config);

const auth = firebase.auth();
const storage = firebase.storage();

exports.firebase = firebase;
exports.auth = auth;
exports.storage = storage;