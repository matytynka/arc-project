const express = require('express');
const router = express.Router();

const { googleTranslateHandler } = require('../controllers/googleTranslate');

/* Handles translation request */
router.post('/', googleTranslateHandler);

module.exports = router;