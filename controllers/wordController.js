const wordModel = require('../models/wordModel');
const firestoreConfig = require('../configs/firestoreConfig');

const admin = firestoreConfig.admin;
const db_words = admin.firestore().collection('userData');

const accountController = require('./accountController');

/**
 * Gets all the words from Firestore.
 *
 * @returns {Promise<Array<Word>>} Returns an promise with Array<Word> as its value.
 */
exports.getWordList = async function() {
    return accountController.get().then(async (user) => {
        const snapshot = await db_words.doc(user.uid).collection('words').get();
        let wordList = [];
        snapshot.forEach((w) => {
            let word = new wordModel(w.data().local, w.data().foreign, w.id, w.data().learn);
            wordList.push(word);
        });
        console.log("LIST:" + wordList);
        return wordList;
    }).catch((error) => {
        console.log("["+error.code+"]: "+error.message);
    });
}

/**
 * Gets an word by id from Firestore.
 *
 * @param {String} wordId Word's id
 *
 * @returns {Promise<Word>} Returns an promise with single Word as its value.
 */
exports.getById = async function(wordId) {
    return accountController.get()
        .then(async (user) => {
            const w = await db_words.doc(user.uid).collection('words').doc(wordId).get();
            if (!w.exists) {
                console.log('Word with id ' + wordId + ' doesn\'t exist!');
                return null;
            } else {
                let word = new wordModel(w.data().local, w.data().foreign, w.id, w.data().learn);
                console.log('Word[' + wordId + ']: ' + word.toString());
                return word;
            }
        }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
        });
}

/**
 * Adds an word to Firestore.
 *
 * @param {Word} word An word to add.
 * @param {String} word.local Local version of a word
 * @param {String} word.foreign Foreign version of a word
 * @param {Number} word.learn Level of learn
 * @returns {Promise<void>}
 */
exports.add = async function(word) {
    accountController.get().then(async (user) => {
        const w = {
            local: word.local,
            foreign: word.foreign,
            learn: word.learn
        }
        await db_words.doc(user.uid).collection('words').add(w);
        await db_words.doc(user.uid).update({
            wordCount: admin.firestore.FieldValue.increment(1)
        });
    }).catch((error) => {
        console.log("["+error.code+"]: "+error.message);
    });
}


/**
 * Deletes an word by id from the Firestore.
 * 
 * @param {String} id Id of the word.
 * @returns {Promise<void>}
 */
exports.delete = async function(id) {
    accountController.get()
        .then(async (user) => {
            await db_words.doc(user.uid).collection('words').doc(id).delete();
            await db_words.doc(user.uid).update({
                wordCount: admin.firestore.FieldValue.increment(-1)
            });
        }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
        });
}

/**
 * Learns up an word.
 *
 * @param id
 * @returns {Promise<void>}
 */
exports.learnUp = async function(id) {
    accountController.get()
        .then(async (user) => {
            await db_words.doc(user.uid).collection('words').doc(id).update({
                learn: admin.firestore.FieldValue.increment(1)
            });
        }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
        });
}

/**
 * Learns down an word.
 *
 * @param id
 * @returns {Promise<void>}
 */
exports.learnDown = async function(id) {
    accountController.get()
        .then(async (user) => {
            await db_words.doc(user.uid).collection('words').doc(id).update({
                learn: admin.firestore.FieldValue.increment(-1)
            });
        }).catch((error) => {
        console.log("["+error.code+"]: "+error.message);
    });
}