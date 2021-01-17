var express = require('express');
var router = express.Router();

const { setSessionHandler } = require('../controllers/session');

/* Displays home page. */
router.post('/', setSessionHandler);

module.exports = router;
