var express = require('express');
var router = express.Router();

const wordModel = require('../models/wordModel');
const wordController = require('../controllers/wordController');

/**
 * Gets all the words from Firestore.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response containing list of words
 */
router.get('/', (req, res) => {
    wordController.getWordList().then(wordList => {
        res.send(wordList);
    });
});


/**
 * Gets an word by id from Firestore.
 *
 * @params {Request} req HTTP Request
 * @params {String} req.params.wordid Id of the word
 * @params {Response} res HTTP Response containing the requested word
 */
router.get('/:id', (req, res) => {
    wordController.getById(req.params.id).then(word => {
        res.send(word);
    });
});

/**
 * Adds an word to Firestore.
 *
 * @params {Request} req HTTP Request
 * @params {String} req.params.local Local version of the word
 * @params {String} req.params.foreign Foreign version of the word
 * @params {Response} res HTTP Response
 */
router.post('/add/:local/:foreign', (req, res) => {
    let word = new wordModel(req.params.local, req.params.foreign, "");
    wordController.add(word).then(() => {
        res.send("Word added");
        //TODO: Maybe some response?
    });
});

/**
 * Deletes an word by id from the Firestore.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 */
router.delete('/del/:id', (req, res) => {
    wordController.delete(req.params.id).then(() => {
        res.send("Word deleted");
        //TODO: Maybe some response?
    });
});

module.exports = router;