var express = require('express');
var router = express.Router();

const { getIndexViewHandler } = require('../controllers/indexView');

/* Displays home page. */
router.get('/', getIndexViewHandler);

module.exports = router;
