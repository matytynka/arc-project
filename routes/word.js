var express = require('express');
var router = express.Router();

const Word = require('../models/word');
const wordController = require('../controllers/wordController');


router.get('/', (req, res) => {
    wordController.getWordList(req, res).then(wordList => {
        res.send(wordList);
    });
});

router.get('/:wordId', (req, res) => {
    wordController.getById(req, res).then(word => {
        res.send(word);
    });
});

router.post('/add/:foreign/:local', (req, res) => {
    wordController.add(req, res).then(word => {
        res.send("Word added");
        //TODO: Maybe some response?
    });
});

router.delete('/del/:wordId', (req, res) => {
    wordController.delete(req, res).then(word => {
        res.send("Word deleted");
        //TODO: Maybe some response?
    });
});

module.exports = router;