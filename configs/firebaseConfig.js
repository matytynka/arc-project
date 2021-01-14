const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/storage');
require('dotenv').config();

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
}

firebase.default.initializeApp(config);

const auth = firebase.auth();
const storage = firebase.storage();

exports.firebase = firebase;
exports.auth = auth;
exports.storage = storage;