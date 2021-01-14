const express = require('express');
const router = express.Router();

const { getIndexViewHandler } = require('../controllers/learningView');

/* Displays learning page */
router.get('/', getIndexViewHandler);

module.exports = router;