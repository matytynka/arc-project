const firestoreConfig = require('../configs/firestoreConfig');

const admin = firestoreConfig.admin;
const db_words = admin.firestore().collection('userData');
const batch = admin.firestore().batch();

const express = require('express');
const router = express.Router();

router.get('/:uid/', async (req, res) => {
    let wordList = {};
    const uid = req.params.uid;
    await db_words.doc(uid).collection('words').get()
        .then((snapshot) => {
            snapshot.forEach((w) => {
                wordList[w.id] = {
                    "local": w.data().local,
                    "foreign": w.data().foreign,
                    "learn": w.data().learn
                };
            });
            res.status(200).send(wordList);
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`;
            console.log(`[API] ${errMsg}`);
            res.status(500).send(errMsg);
        });
});

router.get('/:uid/unlearned/', async (req, res) => {
    let wordList = {};
    const uid = req.params.uid;
    await db_words.doc(uid).collection('words').get()
        .then((snapshot) => {
            snapshot.forEach((w) => {
                if(w.data().learn < 3) {
                    wordList[w.id] = {
                        "local": w.data().local,
                        "foreign": w.data().foreign,
                        "learn": w.data().learn
                    };
                }
            });
            res.status(200).send(wordList);
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`;
            console.log(`[API] ${errMsg}`);
            res.status(500).send(errMsg);
        });
});

router.get('/:uid/:id/', async (req, res) => {
    const uid = req.params.uid;
    const wordId = req.params.id;
    const w = await db_words.doc(uid).collection('words').doc(wordId).get();
    if (!w.exists) {
        res.status(404).send(`Word with id ${wordId} doesn\'t exist!`)
    } else {
        res.status(200).send({
            "local": w.data().local,
            "foreign": w.data().foreign,
            "learn": w.data().learn
        });
    }
});

router.post('/:uid/', async (req, res) => {
    const uid = req.params.uid;
    const words = req.body;
    words.forEach((word) => {
        let docRef = db_words.doc(uid).collection('words').doc();
        batch.set(docRef, word);
    });
    await batch.commit()
        .then(async (w) => {
            await db_words.doc(uid).update({
                wordCount: admin.firestore.FieldValue.increment(words.length)
            });
            res.status(200).send(w);
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`;
            console.log(`[API] ${errMsg}`);
            res.status(400).send(errMsg);
        });
});

router.delete('/:uid/', async (req, res) => {
    const uid = req.params.uid;
    const wordIds = req.body;
    wordIds.map((id) => {
        let docRef = db_words.doc(uid).collection('words').doc(id);
        batch.delete(docRef);
    })
    await batch.commit()
        .then(async (w) => {
            await db_words.doc(uid).update({
                wordCount: admin.firestore.FieldValue.increment(-1 * wordIds.length)
            });
            res.status(200).send(w);
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`;
            console.log(`[API] ${errMsg}`);
            res.status(400).send(errMsg);
        });
});

module.exports = router;