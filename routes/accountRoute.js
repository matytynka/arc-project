const express = require('express');
const router = express.Router();


//TODO: Fix documentation

const loginController = require('../controllers/accountController');

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
router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const passwordCheck = req.body.passwordcheck;
    loginController.register(email, password, passwordCheck)
        .then(() => {
            res.status(201).send("Created account!");
        }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
            res.status(400).send("["+error.code+"]: "+error.message);
        });
});

/**
 * Log ins the user to the app.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 */
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    loginController.login(email, password)
        .then(() => {
            res.status(200).redirect('/wordbase');
        }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
            res.status(400).send("["+error.code+"]: "+error.message);
        });
});


/**
 * Log outs the user from the app.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 */
router.get('/logout', (req, res) => {
    loginController.logout()
        .then(() => {
            res.status(200).redirect("/");
        }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
            res.status(400).send("["+error.code+"]: "+error.message);
        });

});

router.get('/user', (req, res) => {
    loginController.get()
        .then((user) => {
            res.status(200).send(user);
        }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
            res.status(400).send("["+error.code+"]: "+error.message);
        });
})

module.exports = router;