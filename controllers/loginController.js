const firebase = require("firebase/app");
const firebaseConfig = require('../configs/firebaseConfig');

firebase.initializeApp(firebaseConfig);

/**
 * Creates an user with given email and password in Firebase.
 *
 * @param {String} email User's email
 * @param {String} password User's password
 * @returns {Promise<void>}
 */
exports.register = async function(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            //Signed in
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
        });
}

/**
 * Logins an user with given email and password.
 *
 * @param email
 * @param password
 * @returns {Promise<void>}
 */
exports.login = async function(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            //Signed in
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
        });
}

/**
 * Log outs the user.
 *
 *
 */
exports.logout = async function() {
    firebase.auth().signOut().then(() => {

    }).catch((error) => {

    });
}

firebase.auth().onAuthStateChanged((user) => {
   if (user) {
       //Signed in
       var uid = user.uid;
   } else {
       //User is signed out
   }
});