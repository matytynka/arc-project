const express = require('express');
const router = express.Router();

const { getWordListHandler, getUnlearnedWordListHandler, getWordByIdHandler,
        addWordHandler, addWordsHandler, deleteWordHandler, learnWordUpHandler,
        learnWordDownHandler } = require('../controllers/word');

/* Gets all the words from Firestore. */
router.get('/', getWordListHandler);

/* Get all unlearned words from Firestore. */
router.get('/unlearned', getUnlearnedWordListHandler);

/* Adds an word to Firestore using sent data in request body. */
router.post('/add', addWordHandler);

/* Adds multiple words to Firestore */
router.post('/addWords', addWordsHandler);

/* Deletes an word by id from the Firestore. */
router.post('/:id', deleteWordHandler);

module.exports = router;