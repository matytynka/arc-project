const { firebase } = require("../configs/firebaseConfig");

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
            console.log("Success creating account!");
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("["+errorCode+"]: "+errorMessage);
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
    auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            //Signed in
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("["+errorCode+"]: "+errorMessage);
        });
}

/**
 * Log outs the user.
 *
 *
 */
exports.logout = async function() {
    auth().signOut().then(() => {

    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("["+errorCode+"]: "+errorMessage);
    });
}

/*auth().onAuthStateChanged((user) => {
   if (user) {
       //Signed in
       var uid = user.uid;
   } else {
       //User is signed out
   }
});*/