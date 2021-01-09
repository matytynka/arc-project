const express = require('express');
const router = express.Router();

const loginController = require('../controllers/accountController');

/**
 *
 */
router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("EMAIL:" + email + " PASS:" + password);
    loginController.register(email, password)
        .then((user) => {
            res.send("Created account!" + user);
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("["+errorCode+"]: "+errorMessage);
            res.send("["+errorCode+"]: "+errorMessage);
        });
});

/**
 * Log ins the user to the app.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 * @return {Promise}
 */
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    return loginController.login(email, password)
});


/**
 * Log outs the user from the app.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 * @return {Promise}
 */
router.get('/logout', (req, res) => {
    const lo = loginController.logout();
    res.redirect("localhost:3000");
});

module.exports = router;