const express = require('express');
const router = express.Router();

const { getWordListHandler, getUnlearnedWordListHandler,
        addWordHandler, deleteWordHandler, learnUpWordHandler,
        learnDownWordHandler } = require('../controllers/word');

/* Gets all the words from Firestore. */
router.get('/', getWordListHandler);

/* Get all unlearned words from Firestore. */
router.get('/unlearned', getUnlearnedWordListHandler);

/* Adds an word to Firestore using sent data in request body. */
router.post('/add', addWordHandler);

/* Deletes an word by id from the Firestore. */
router.post('/:id', deleteWordHandler);

/* Learns word up */
router.post('/up/:id', learnUpWordHandler);

/* Learns word down */
router.post('/down/:id', learnDownWordHandler);

module.exports = router;