const vision = require('@google-cloud/vision');
const keyFilename = './configs/key.json';
const client = new vision.ImageAnnotatorClient({keyFilename});

exports.detectText = async function(path) {
    const [result] = await client.textDetection(`gs://arc-project-302014.appspot.com/${path}`);
    const detections = result.textAnnotations;
    return detections[0].description.replace(/[,.]/g, "").split(" ");
}
