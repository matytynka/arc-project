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
 * @params {String} req.params.id Id of the word
 * @params {Response} res HTTP Response containing the requested word
 */
router.get('/:id', (req, res) => {
    wordController.getById(req.params.id).then(word => {
        res.send(word);
    });
});

/**
 * Adds an word to Firestore using params in URL.
 *
 * @deprecated
 *
 * @params {Request} req HTTP Request
 * @params {String} req.params.local Local version of the word
 * @params {String} req.params.foreign Foreign version of the word
 * @params {Response} res HTTP Response
 */
router.post('/add/:local/:foreign', (req, res) => {
    let word = new wordModel(req.params.local, req.params.foreign, "", 0);
    wordController.add(word).then(() => {
        res.redirect('back');
    });
});

/**
 * Adds an word to Firestore using sent data in request body.
 *
 * @params {Request} req HTTP Request
 * @params {String} req.body.local Local version of the word
 * @params {String} req.body.foreign Foreign version of the word
 * @params {Response} res HTTP Response
 */
router.post('/add', (req, res) => {
    let word = new wordModel(req.body.local, req.body.foreign, "", 0);
    wordController.add(word)
        .then(() => {
            res.redirect('back');
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("["+errorCode+"]: "+errorMessage);
            res.status(400).send("["+errorCode+"]: "+errorMessage);
        });
});

/**
 * Adds multiple words to Firestore
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 */
router.post('/addMult', (req, res) => {
    res.status(501).send("NOT IMPLEMENTED");
    //TODO: Implement multiple add
})


/**
 * Deletes an word by id from the Firestore.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 */
router.delete('/del/:id', (req, res) => {
    wordController.delete(req.params.id)
        .then(() => {
            res.status(200).send("Word deleted");
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("["+errorCode+"]: "+errorMessage);
            res.status(400).send("["+errorCode+"]: "+errorMessage);
        });
});

/**
 * Increases 'learn' of a word by 1.
 *
 * @params {Request} req HTTP Request
 * @params {String} req.params.id Id of the word
 * @params {Response} res HTTP Response
 */
router.post('/:id/up', (req, res) => {
    wordController.learnUp(req.params.id)
        .then(() => {
            res.status(200).send("Word leveled up");
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("["+errorCode+"]: "+errorMessage);
            res.status(400).send("["+errorCode+"]: "+errorMessage);
        });
});

/**
 * Decreases 'learn' of a word by 1.
 *
 * @params {Request} req HTTP Request
 * @params {String} req.params.id Id of the word
 * @params {Response} res HTTP Response
 */
router.post('/:id/down', (req, res) => {
    wordController.learnDown(req.params.id)
        .then(() => {
            res.status(200).send("Word leveled down");
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("["+errorCode+"]: "+errorMessage);
            res.status(400).send("["+errorCode+"]: "+errorMessage);
        });
});

module.exports = router;