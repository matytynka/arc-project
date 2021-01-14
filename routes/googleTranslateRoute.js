const express = require('express');
const router = express.Router();

const googleTranslateController = require('../controllers/googleTranslateController');

/**
 * Translates given text of array of texts to target language.
 *
 * @params {Request} req HTTP Request
 * @params {String|String[]} req.body.text Single text of array of texts
 * to be translated.
 * @params {String} req.body.target Code of the target language. Codes can be found
 * here: https://cloud.google.com/translate/docs/languages
 * @params {Response} res HTTP Response containing translated text or
 * array of texts.
 */
router.post('/', (req, res) => {
   const text = req.body.text;
   const target = req.body.target;
   googleTranslateController.translateText(text, target)
       .then((word) => {
            res.status(200).send(word);
       }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
            res.status(400).send("["+error.code+"]: "+error.message);
       });
});

module.exports = router;