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
exports.word_list = async function(req, res) {
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
 * @param {string} id of the word in Firestore 
 * 
 * @return {Word} Return single word.
 */
exports.getById = async function(req, res, id) {
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
 * @param {Word} word that will be added to Firestore
 */
exports.add = async function(req, res, word) {
    const w = {
        local: word.local,
        foreign: word.foreign
    }
    await db_words.add(w);
}


/**
 * Deletes an word by id from the Firestore.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} id Id of the word to be deleted.
 */
exports.delete = async function(req, res, id) {
    await db_words.doc(id).delete();
}