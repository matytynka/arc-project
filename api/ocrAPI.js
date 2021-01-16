const { firebase } = require("../configs/firebaseConfig");

const vision = require('@google-cloud/vision');
const keyFilename = './configs/key.json';
const client = new vision.ImageAnnotatorClient({keyFilename});

const express = require('express');
const router = express.Router();

/**
 * @param {Request} req
 * @param {String} req.body.photoPath
 */
router.post('/detectText', async (req, res) => {
    const photoPath = req.body.photoPath;
    const [result] = await client.textDetection(`gs://"arc-project-bf6c3.appspot.com/${photoPath}`);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text));
    res.status(200).send(photoPath);
});

module.exports = router;