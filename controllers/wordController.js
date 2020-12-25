const wordModel = require('../models/wordModel');
const firestoreConfig = require('../configs/firestoreConfig');

db = firestoreConfig.db;
db_words = db.collection('words');

/**
 * Gets all the words from Firestore.
 *
 * @returns {Promise<Array<Word>>} Returns an promise with Array<Word> as its value.
 */
exports.getWordList = async function() {
    const snapshot = await db_words.get();
    let wordList = [];
    snapshot.forEach((w) => {
        let word = new wordModel(w.data().local, w.data().foreign, w.id);
        wordList.push(word);
        console.log('Word[' + word.getId + ']: ' + word.toString());
    })
    return wordList;
}

/**
 * Gets an word by id from Firestore.
 *
 * @param {String} wordId Word's id
 *
 * @returns {Promise<Word>} Returns an promise with single Word as its value.
 */
exports.getById = async function(wordId) {
    const w = await db_words.doc(wordId).get();
    if (!w.exists) {
        console.log('Word with id ' + wordId + ' doesn\'t exist!');
        return null;
    } else {
        let word = new wordModel(w.data().local, w.data().foreign, w.id);
        console.log('Word[' + wordId + ']: ' + word.toString());
        return word;
    }
}

/**
 * Adds an word to Firestore.
 *
 * @param {Word} word An word to add.
 * @param {String} word.local Local version of a word
 * @param {String} word.foreign Foreign version of a word
 * @returns {Promise<void>}
 */
exports.add = async function(word) {
    const w = {
        local: word.local,
        foreign: word.foreign
    }
    await db_words.add(w);
}


/**
 * Deletes an word by id from the Firestore.
 * 
 * @param {String} id Id of the word.
 * @returns {Promise<void>}
 */
exports.delete = async function(id) {
    await db_words.doc(id).delete();
}