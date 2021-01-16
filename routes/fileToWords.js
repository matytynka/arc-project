const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

const { fileToWordsHandler } = require('../controllers/fileToWords');

/* Handle file upload */
router.post('/', upload.array("files"), fileToWordsHandler);

module.exports = router;