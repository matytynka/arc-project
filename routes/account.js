const express = require('express');
const router = express.Router();

const loginController = require('../controllers/account');

const { registerHandler, loginHandler, logoutHandler, providerLoginHandler } = require("../controllers/account");


/* Handles user registration form */
router.post('/register', registerHandler);

/* Handles user login form */
router.post('/login', loginHandler);

/* Handles provider login */
router.post('/providerLogin', providerLoginHandler);

/* Handles user logout */
router.get('/logout', logoutHandler);

module.exports = router;