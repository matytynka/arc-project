const wordModel = require('../models/wordModel');
const firestoreConfig = require('../configs/firestoreConfig');

const admin = firestoreConfig.admin;
const db_words = admin.firestore().collection('userData');

const { getUserHandler } = require('./account');

//TODO: Make better jsdocs

/* Handlers initialization */
exports.getWordListHandler = async function (req, res) { return await getWordList(req, res); }
exports.getUnlearnedWordListHandler = async function(req, res) { return await getUnlearnedWordList(req, res); }
exports.addWordHandler = async function(req, res) { await addWord(req, res); }
exports.addWordsHandler = async function(req, res) { await addWords(req, res); }
exports.deleteWordHandler = async function(req, res) { await deleteWord(req, res); }
exports.learnWordUpHandler = async function(req, res) { await learnWordUp(req, res); }
exports.learnWordDownHandler = async function(req, res) { await learnWordDown(req, res); }

/**
 * Gets all the words from Firestore.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response containing list of words
 *
 * @returns {Promise<Word[]>}
 */
async function getWordList(req, res) {
    const user = getUserHandler(req, res);
    const snapshot = await db_words.doc(user.uid).collection('words').get()
        .then((snapshot) => {
            return snapshot;
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`
            console.log(error);
            return null;
        });
    let wordList = [];
    snapshot.forEach((w) => {
        let word = new wordModel(w.data().local, w.data().foreign, w.id, w.data().learn);
        wordList.push(word);
    });
    return wordList;
}

/**
 * Get all unlearned words from Firestore.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 *
 * @returns {Promise<Word[]>}
 */
async function getUnlearnedWordList(req, res) {
    const user = getUserHandler(req, res);
    const snapshot = await db_words.doc(user.uid).collection('words').get();
    let wordList = [];
    snapshot.forEach((w) => {
        if(w.data().learn < 3) {
            let word = new wordModel(w.data().local, w.data().foreign, w.id, w.data().learn);
            wordList.push(word);
        }
    });
    return wordList;
}

/**
 * Adds an word to Firestore.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 *
 * @returns {Promise<void>}
 */
async function addWord(req, res) {
    const user = getUserHandler(req, res);
    let word = new wordModel(req.body.local, req.body.foreign, "", 0);
    const w = {
        local: word.local,
        foreign: word.foreign,
        learn: word.learn
    }
    await db_words.doc(user.uid).collection('words').add(w);
    await db_words.doc(user.uid).update({
        wordCount: admin.firestore.FieldValue.increment(1)
    });
    res.redirect('back');
}

/**
 * Adds multiple words to Firestore.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 *
 * @returns {Promise<void>}
 */
async function addWords(req, res) {
    res.status(501).send("NOT IMPLEMENTED");
    //TODO: Implement multiple add
}
/**
 * Deletes an word by id from the Firestore.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 *
 * @returns {Promise<void>}
 */
async function deleteWord(req, res) {
    const user = getUserHandler(req, res);
    const id = req.params.id;

    await db_words.doc(user.uid).collection('words').doc(id).delete();
    await db_words.doc(user.uid).update({
        wordCount: admin.firestore.FieldValue.increment(-1)
    });
    res.redirect('/wordbase');
}

/**
 * Initializes user in Firebase database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function initializeUser(req, res) {
    const user = getUserHandler(req, res);
    const u = {
        wordCount: 0
    }
    await db_words.doc(user.id).set(u);
}

//TODO: Move to api
/**
 * Learns up an word.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 *
 * @returns {Promise<void>}
 */
async function learnWordUp(req, res) {
    const user = getUserHandler(req, res);
    const id = req.params.id;

    await db_words.doc(user.uid).collection('words').doc(id).update({
        learn: admin.firestore.FieldValue.increment(1)
    });
    res.status(200).send("Word leveled up");
}

//TODO: Move to api
/**
 * Learns down an word.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 *
 * @returns {Promise<void>}
 */
async function learnWordDown(req, res) {
    const user = getUserHandler(req, res);
    const id = req.params.id;

    await db_words.doc(user.uid).collection('words').doc(id).update({
        learn: admin.firestore.FieldValue.increment(-1)
    });
    res.status(200).send("Word leveled down");
}