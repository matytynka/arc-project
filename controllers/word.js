const firestoreConfig = require('../configs/firestoreConfig');

const admin = firestoreConfig.admin;
const db_words = admin.firestore().collection('userData');
const batch = admin.firestore().batch();

/* Handlers initialization */
exports.getWordListHandler = async function (req, res) { return await getWordList(req, res); }
exports.getUnlearnedWordListHandler = async function(req, res) { return await getUnlearnedWordList(req, res); }
exports.addWordHandler = async function(req, res) { await addWord(req, res); }
exports.deleteWordHandler = async function(req, res) { await deleteWord(req, res); }
exports.learnUpWordHandler = async function(req, res) { await learnUp(req, res); }
exports.learnDownWordHandler = async function(req, res) { await learnDown(req, res); }

/**
 * Get's user's word list.
 *
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 *
 * @param {String} req.session.uid id of the user.
 *
 * @returns {Promise<Word[]>}
 */
async function getWordList(req, res) {
    const uid = req.session.uid;
    const snapshot = await db_words.doc(uid).collection('words').get()
        .then((snapshot) => {
            return snapshot;
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`
            console.log(errMsg);
            return null;
        });
    let wordList = [];
    snapshot.forEach((word) => {
        const w = {
            id: word.id,
            local: word.data().local,
            foreign: word.data().foreign,
            learn: word.data().learn
        }
        wordList.push(w);
    });
    return wordList;
}

/**
 * Get's user's unlearned word list.
 *
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 *
 * @param {String} req.session.uid id of the user.
 *
 * @returns {Promise<Word[]>}
 */
async function getUnlearnedWordList(req, res) {
    const uid = req.session.uid;
    const snapshot = await db_words.doc(uid).collection('words').get()
        .then((snapshot) => {
            return snapshot;
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`
            console.log(errMsg);
            return null;
        });
    let wordList = [];
    snapshot.forEach((word) => {
        if(word.data().learn < 3) {
            const w = {
                id: word.id,
                local: word.data().local,
                foreign: word.data().foreign,
                learn: word.data().learn
            }
            wordList.push(w);
        }
    });
    return wordList;
}

/**
 * Add single word for a user.
 *
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 *
 * @param {String} req.session.uid id of the user.
 * @param {String} req.body.local Local version of a word.
 * @param {String} req.body.foreign Foreign version of a word.
 */
async function addWord(req, res) {
    const uid = req.session.uid;
    const w = {
        local: req.body.local,
        foreign: req.body.foreign,
        learn: 0
    }
    await db_words.doc(uid).collection('words').add(w);
    res.redirect('back');
}

/**
 * Add multiple words for a user.
 *
 * @param {String} uid User's ID.
 * @param {Word[]} words Array of words to add
 * @returns {Promise<void>}
 */
exports.addWords = async function(uid, words) {
    words.forEach((word) => {
        let docRef = db_words.doc(uid).collection('words').doc();
        batch.set(docRef, word);
    });
    await batch.commit();
}

/**
 * Deletes single word from a user.
 *
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 *
 * @param {String} req.session.uid id of the user.
 * @param {String} req.params.id id of a word.
 */
async function deleteWord(req, res) {
    const uid = req.session.uid;
    const id = req.params.id;

    await db_words.doc(uid).collection('words').doc(id).delete();
    res.redirect('/wordbase');
}

/**
 * Levels up a word.
 *
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 *
 * @param {String} req.session.uid id of the user.
 * @param {String} req.params.id id of a word.
 */
async function learnUp(req, res) {
    const uid = req.session.uid;
    const id = req.params.id;

    await db_words.doc(uid).collection('words').doc(id).update({
       learn: admin.firestore.FieldValue.increment(1)
    });
}


/**
 * Levels down a word.
 *
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 *
 * @param {String} req.session.uid id of the user.
 * @param {String} req.params.id id of a word.
 */
async function learnDown(req, res) {
    const uid = req.session.uid;
    const id = req.params.id;

    await db_words.doc(uid).collection('words').doc(id).update({
        learn: admin.firestore.FieldValue.increment(-1)
    });
}