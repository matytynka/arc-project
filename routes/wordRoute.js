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
        res.status(200).send(wordList);
    }).catch((error) => {
        console.log("["+error.code+"]: "+error.message);
        res.status(400).send("["+error.code+"]: "+error.message);
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
    wordController.getById(req.params.id)
        .then(word => {
            res.status(200).send(word);
        }).catch((err) => {
            console.log("["+error.code+"]: "+error.message);
            res.status(400).send("["+error.code+"]: "+error.message);
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
    wordController.add(word)
        .then(() => {
            res.status(201).redirect('back');
        }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
            res.status(400).send("["+error.code+"]: "+error.message);
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
            res.status(201).redirect('back');
        }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
            res.status(400).send("["+error.code+"]: "+error.message);
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
router.delete('/:id', (req, res) => {
    wordController.delete(req.params.id)
        .then(() => {
            res.status(200).send("Word deleted");
        }).catch((error) => {
            console.log("["+error.code+"]: "+error.message);
            res.status(400).send("["+error.code+"]: "+error.message);
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
            console.log("["+error.code+"]: "+error.message);
            res.status(400).send("["+error.code+"]: "+error.message);
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
            console.log("["+error.code+"]: "+error.message);
            res.status(400).send("["+error.code+"]: "+error.message);
        });
});

module.exports = router;