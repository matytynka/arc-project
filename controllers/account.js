const { firebase } = require("../configs/firebaseConfig");

const firestoreConfig = require('../configs/firestoreConfig');
const admin = firestoreConfig.admin;
const db_words = admin.firestore().collection('userData');

/* Handlers initialization */
exports.registerHandler = async function(req, res) { await register(req, res); }
exports.loginHandler = async function(req, res) { await login(req, res); }
exports.logoutHandler = async function(req, res) { await logout(req, res); }
exports.getUser = function(req, res) { return getUser(req, res);}

/**
 * Creates user's account in Firebase. Requires email and password
 * parameters in Request's body.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 * @params {String} req.body.email Users email
 * @params {String} req.body.password Users password
 * @params {String} req.body.passwordcheck Users passwordcheck
 */
async function register(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const passwordCheck = req.body.passwordcheck;
    /* Check if password and password check are the same */
    if(password === passwordCheck) {
        /* Create account in firebase with given email and password */
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (user) => {
                /* Initialize user in database (create wordCount variable in firestore */
                const u = {
                    wordCount: 0
                }
                await db_words.doc(user.user.uid).set(u);
                console.log("Success creating account!");
                /* Set login session */
                req.session.isLoggedIn = true;
                req.session.uid = user.user.uid;
                /* Redirect to wordbase */
                res.redirect('/wordbase');
            }).catch((error) => {
                /* Handle user creation error */
                let errMsg = `[${error.code}]: ${error.message}`
                res.render('index', {registerErr: errMsg});
            });
    } else {
        /* Handle when passwords are not matching */
        console.log(`${password}:${passwordCheck}`)
        res.render('index', {registerErr: "Hasła nie pasują do siebie."});
    }
}

/**
 * Logins an user with given email and password.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 * @param {String} req.body.email
 * @param {String} req.body.password
 */
async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            /* Set login session */
            req.session.isLoggedIn = true;
            req.session.uid = user.user.uid;
            req.session.save();
            /* Redirect to wordbase */
            res.redirect('/wordbase');
        }).catch((error) => {
            /* Handle user creation error */
            let errMsg = `[${error.code}]: ${error.message}`
            res.render('index', {loginErr: errMsg});
        });
}

/**
 * Log outs the user.
 */
async function logout(req, res) {
    await firebase.auth().signOut()
        .then(() => {
            /* Set login session */
            req.session.isLoggedIn = false;
            req.session.uid = "";
            /* Redirect to main page */
            res.redirect("/");
        }).catch((error) => {
            /* Handle user creation error */
            console.log("["+error.code+"]: "+error.message);
            res.redirect("/");
        });
}
