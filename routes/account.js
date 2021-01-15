const express = require('express');
const router = express.Router();

const loginController = require('../controllers/account');

const { registerHandler, loginHandler, logoutHandler, getUserHandler } = require("../controllers/account");


/* Handles user registration form */
router.post('/register', registerHandler);

/* Handles user login form */
router.post('/login', loginHandler);

/* Handles user logout */
router.get('/logout', logoutHandler);

/* Handles and gets current user */
router.get('/user', getUserHandler);

module.exports = router;