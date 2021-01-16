const express = require('express');
const router = express.Router();

const { repeatingWordsHandler } = require('../controllers/repeatingWords');

router.post('/', repeatingWordsHandler);

module.exports = router;