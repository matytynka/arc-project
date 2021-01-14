const {Translate} = require('@google-cloud/translate').v2;

const keyFilename = './configs/key.json';
const translate = new Translate({keyFilename});

/**
 * Translates given text to target language.
 *
 * @param {String}text Text to be translated. Can be an array of texts.
 * @param {String} target Code of the target language. Codes can be found
 * here: https://cloud.google.com/translate/docs/languages
 *
 * @returns {Promise<string>}
 * @returns {Promise<string[]>}
 */
exports.translateText = async function(text, target) {
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log('Translations: ' + translations);
    return translations;
}