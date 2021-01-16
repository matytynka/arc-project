const {Translate} = require('@google-cloud/translate').v2;

const keyFilename = './configs/key.json';
const translate = new Translate({keyFilename});

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
exports.translateText = async function(text, target) {
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log('Translations: ' + translations);
    return translations;
}