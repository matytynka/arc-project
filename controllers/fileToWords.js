const { firebase } = require('../configs/firebaseConfig');


const { filterWords } = require('./repeatingWords');
const { translateText } = require('./googleTranslate');
const { detectText } = require('./ocr');
const { addWords } = require('./word');

exports.fileToWordsHandler = async function(req, res) {
    await uploadFile(req, res)
        .then(async (path) => {
            console.log(path);
            return await detectText(path);
        }).then((detectedWords) => {
            return filterWords(detectedWords);
        }).then(async (filteredWords) => {
            let wordsList = [];
            const translations = await translateText(filteredWords, "pl");
            console.log(`FILTERED: ${filteredWords.length}  TRANSLATIONS: ${translations.length}`);
            for(let i = 0; i < filteredWords.length; i++) {
                let w = {
                    foreign: filteredWords[i],
                    local: translations[i],
                    learn: 0
                }
                wordsList.push(w);
            }
            await addWords(req.session.uid, wordsList);
        })
    res.redirect('back');
}

async function uploadFile(req, res) {
    const file = req.files[0];
    const path = `ocr/${req.session.uid}/${file.originalname}`;
    return await firebase.storage().ref(path).put(file.buffer)
        .then(() => {
            console.log(path);
            return(path);
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`
            console.log(errMsg);
            res.status(400).send(errMsg);
            return null;
        });
}
