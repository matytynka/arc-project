const express = require('express');
const router = express.Router();

const { getWordbaseViewHandler } = require('../controllers/wordbaseView');

/* Displays wordbase.jade site */
router.get('/', getWordbaseViewHandler);

module.exports = router;