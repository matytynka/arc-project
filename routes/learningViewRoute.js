const express = require('express');
const router = express.Router();

const learningViewController = require('../controllers/learningViewController');

router.get('/', learningViewController.index);

module.exports = router;