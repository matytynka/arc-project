const { firebase } = require("../configs/firebaseConfig");

/**
 * Creates an user with given email and password in Firebase.
 *
 * @param {String} email User's email
 * @param {String} password User's password
 * @param {String} passwordCheck User's password check
 * @returns {Promise<void>}
 */
exports.register = async function(email, password, passwordCheck) {
    if(password === passwordCheck) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log("Success creating account!");
            }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
        });
    }
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
            console.log("Success logging in!");
        }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
        });
}

/**
 * Log outs the user.
 *
 * @returns {Promise<void>}
 */
exports.logout = async function() {
    firebase.auth().signOut()
        .then(() => {
            console.log("Success logging out!");
        }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
        });
}

/**
 * Get current user.
 *
 */
exports.get = async function() {
    return firebase.auth().currentUser;
}

/*auth().onAuthStateChanged((user) => {
   if (user) {
       //Signed in
       var uid = user.uid;
   } else {
       //User is signed out
   }
});*/