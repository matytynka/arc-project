const wordModel = require('../models/wordModel');
const firestoreConfig = require('../configs/firestoreConfig');

const admin = firestoreConfig.admin;
const db_words = admin.firestore().collection('userData');

const { getUserHandler } = require('./account');

/* Handlers initialization */
exports.getWordListHandler = async function (req, res) { return await getWordList(req, res); }
exports.getUnlearnedWordListHandler = async function(req, res) { return await getUnlearnedWordList(req, res); }
exports.addWordHandler = async function(req, res) { await addWord(req, res); }
exports.deleteWordHandler = async function(req, res) { await deleteWord(req, res); }
exports.learnUpWordHandler = async function(req, res) { await learnUp(req, res); }
exports.learnDownWordHandler = async function(req, res) { await learnDown(req, res); }

async function getWordList(req, res) {
    const user = getUserHandler(req, res);
    const snapshot = await db_words.doc(user.uid).collection('words').get()
        .then((snapshot) => {
            return snapshot;
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`
            console.log(errMsg);
            return null;
        });
    let wordList = [];
    snapshot.forEach((w) => {
        let word = new wordModel(w.data().local, w.data().foreign, w.id, w.data().learn);
        wordList.push(word);
    });
    return wordList;
}


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

async function deleteWord(req, res) {
    const user = getUserHandler(req, res);
    const id = req.params.id;

    await db_words.doc(user.uid).collection('words').doc(id).delete();
    await db_words.doc(user.uid).update({
        wordCount: admin.firestore.FieldValue.increment(-1)
    });
    res.redirect('/wordbase');
}

async function learnUp(req, res) {
    const user = getUserHandler(req, res);
    const id = req.params.id;

    await db_words.doc(user.uid).collection('words').doc(id).update({
       learn: admin.firestore.FieldValue.increment(1)
    });
}

async function learnDown(req, res) {
    const user = getUserHandler(req, res);
    const id = req.params.id;

    await db_words.doc(user.uid).collection('words').doc(id).update({
        learn: admin.firestore.FieldValue.increment(-1)
    });
}