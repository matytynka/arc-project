const Word = require('../models/word');
const FirestoreConfig = require('../configs/firestoreConfig');

db = FirestoreConfig.db;
db_words = db.collection('words');

/**
 * Gets all the words from firestore and returns it as an array.
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @return {Array<Word>} Return words array.
 */
exports.getWordList = async function(req, res) {
    const snapshot = await db_words.get();
    var wordList = [];
    snapshot.forEach((w) => {
        var word = new Word(w.data().foreign, w.data().local, w.id);
        wordList.push(word);
        console.log('Word[' + word.id + ']: ' + word.toString());
    })
    return wordList;
}

/**
 * Gets an word by id from Firestore and returns it.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @return {Word} Return single word.
 */
exports.getById = async function(req, res) {
    const id = req.params.wordId;
    const w = await db_words.doc(id).get();
    if (!w.exists) {
        console.log('Word with id ' + id + ' doesn\'t exist!');
        return null;
    } else {
        var word = new Word(w.data().foreign, w.data().local);
        console.log('Word[' + id + ']: ' + word.toString());
        return word;
    }
}

/**
 * Adds an word to Firestore.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.add = async function(req, res) {
    const w = {
        local: req.params.local,
        foreign: req.params.foreign
    }
    await db_words.add(w);
}


/**
 * Deletes an word by id from the Firestore.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = async function(req, res) {
    const id = req.params.wordId;
    await db_words.doc(id).delete();
}