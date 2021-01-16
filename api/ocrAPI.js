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
    const [result] = await client.textDetection(`gs://arc-project-bf6c3.appspot.com/${photoPath}`);
    const detections = result.textAnnotations;
    const ret = detections[0].description.replace(/[,.]/g, "").split(" ");
    res.status(200).send(ret);
});

module.exports = router;