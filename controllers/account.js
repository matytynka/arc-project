const { firebase } = require("../configs/firebaseConfig");

const firestoreConfig = require('../configs/firestoreConfig');
const admin = firestoreConfig.admin;
const db_words = admin.firestore().collection('userData');

//TODO: Fix documentation

exports.registerHandler = async function(req, res) {
    await register(req, res);
}

exports.loginHandler = async function(req, res) {
    await login(req, res);
}

exports.logoutHandler = async function(req, res) {
    await logout(req, res);
}

exports.getUserHandler = function(req, res) {
    return getUser(req, res);
}

/**
 * Registers an user.
 *
 * @params {Request} req HTTP Request
 * @params {String} req.body.email Users email
 * @params {String} req.body.password Users password
 * @params {String} req.body.passwordcheck Users passwordcheck
 * @params {Response} res HTTP Response
 * @return {Promise<void>}
 */
async function register(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const passwordCheck = req.body.passwordcheck;
    if(password === passwordCheck) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (user) => {
                const u = {
                    wordCount: 0
                }
                await db_words.doc(user.user.uid).set(u);
                console.log("Success creating account!");
                res.redirect('/wordbase');
            }).catch((error) => {
                let errMsg = `[${error.code}]: ${error.message}`
                res.render('index', {registerErr: errMsg});
            });
    } else {
        console.log(`${password}:${passwordCheck}`)
        res.render('index', {registerErr: "Hasła nie pasują do siebie."});
    }
}

/**
 * Logins an user with given email and password.
 *
 * @param {String} req.body.email
 * @param {String} req.body.password
 * @returns {Promise<void>}
 */
async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Success logging in!");
            res.redirect('/wordbase');
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`
            res.render('index', {loginErr: errMsg});
        });
}

/**
 * Log outs the user.
 *
 * @returns {Promise<void>}
 */
async function logout(req, res) {
    firebase.auth().signOut()
        .then(() => {
            res.redirect("/");
        }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
            res.redirect("/");
        });
}

/**
 * Get current user.
 *
 */
function getUser(req, res) {
    return firebase.auth().currentUser;
}