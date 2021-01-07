const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');


router.get('/', (req, res) => {

});

router.get('/login', (req, res) => {
    console.log(req.params);
    const login = req.params.id;
    const password = req.params.password;
    loginController.login(login, password)
});