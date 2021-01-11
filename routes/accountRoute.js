const express = require('express');
const router = express.Router();

const loginController = require('../controllers/accountController');

/**
 * Registers an user.
 *
 * @params {Request} req HTTP Request
 * @params {String} req.body.email Users email
 * @params {String} req.body.password
 * @params {Response} res HTTP Response
 * @return {Promise<void>}
 */
router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("EMAIL:" + email + " PASS:" + password);
    loginController.register(email, password)
        .then((user) => {
            res.status(201).send("Created account!");
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("["+errorCode+"]: "+errorMessage);
            res.status(400).send("["+errorCode+"]: "+errorMessage);
        });
});

/**
 * Log ins the user to the app.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 * @return {Promise<void>}
 */
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    loginController.login(email, password)
        .then((user) => {
            res.status(200).redirect('/wordbase');
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("["+errorCode+"]: "+errorMessage);
            res.status(400).send("["+errorCode+"]: "+errorMessage);
        });
});


/**
 * Log outs the user from the app.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 * @return {Promise}
 */
router.get('/logout', (req, res) => {
    loginController.logout()
        .then((user) => {
            res.status(200).redirect("/");
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("["+errorCode+"]: "+errorMessage);
            res.status(400).send("["+errorCode+"]: "+errorMessage);
        });

});

router.get('/user', (req, res) => {
    loginController.get()
        .then((user) => {
            res.status(200).send(user);
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("["+errorCode+"]: "+errorMessage);
            res.status(400).send("["+errorCode+"]: "+errorMessage);
        });
})

module.exports = router;