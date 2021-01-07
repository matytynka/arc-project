const express = require('express');
const router = express.Router();

const wordbaseViewController = require('../controllers/wordbaseViewController');

router.get('/', wordbaseViewController.index);

module.exports = router;