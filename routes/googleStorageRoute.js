const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

const { uploadFileHandler } = require('../controllers/googleStorageController');

/* Handle file upload */
router.post('/', upload.array("files"), uploadFileHandler);

module.exports = router;