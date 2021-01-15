const wordModel = require('../models/wordModel');
const firestoreConfig = require('../configs/firestoreConfig');
const admin = firestoreConfig.admin;
const db_words = admin.firestore().collection('userData');

const express = require('express');
const router = express.Router();

router.get('/:uid/', async (req, res) => {
    let wordList = {};
    const uid = req.params.uid;
    await db_words.doc(uid).collection('words').get()
        .then((snapshot) => {
            snapshot.forEach((w) => {
                let word = new wordModel(w.data().local, w.data().foreign, w.id, w.data().learn);
                wordList.push(word);
            });
            res.status(200).send(wordList);
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`;
            console.log(`[API] ${errMsg}`);
            res.status(500).send(errMsg);
        });
});

router.get('/:uid/unlearned', async (req, res) => {
    let wordList = {};
    const uid = req.params.uid;
    const snapshot = await db_words.doc(uid).collection('words').get()
        .then((snapshot) => {
            snapshot.forEach((w) => {
                if(w.data().learn < 3) {
                    let word = new wordModel(w.data().local, w.data().foreign, w.id, w.data().learn);
                    wordList.push(word);
                }
            });
            res.status(200).send(wordList);
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`;
            console.log(`[API] ${errMsg}`);
            res.status(500).send(errMsg);
        });
});

router.post('/:uid/add/:local/:foreign/:learn', async (req, res) => {
    const uid = req.params.uid;
    let word = new wordModel(req.params.local, req.params.foreign, "", req.params.learn);
    const w = {
        local: word.local,
        foreign: word.foreign,
        learn: word.learn
    }
    await db_words.doc(uid).collection('words').add(w)
        .then(async ()=> {
            await db_words.doc(uid).update({
                wordCount: admin.firestore.FieldValue.increment(1)
            });
            res.status(200).send(word);
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`;
            console.log(`[API] ${errMsg}`);
            res.status(400).send(errMsg);
        });
});

router.post('/:uid/:id/', async (req, res) => {
    const uid = req.params.uid;
    const wordId = req.params.id;
    const w = await db_words.doc(uid).collection('words').doc(wordId).get();
    if (!w.exists) {
        res.status(404).send(`Word with id ${wordId} doesn\'t exist!`)
    } else {
        let word = new wordModel(w.data().local, w.data().foreign, w.id, w.data().learn);
        res.status(200).send(word);
    }
});


router.post('/:uid/:id/up', async (req, res) => {
    const uid = req.params.uid;
    const id = req.params.id;
    await db_words.doc(uid).collection('words').doc(id).update({
        learn: admin.firestore.FieldValue.increment(1)
    });
    res.status(200).send("Word leveled up");
});

router.post('/:uid/:id/down', async (req, res) => {
    const uid = req.params.uid;
    const id = req.params.id;
    await db_words.doc(uid).collection('words').doc(id).update({
        learn: admin.firestore.FieldValue.increment(-1)
    });
    res.status(200).send("Word leveled down");
});

router.delete('/:uid/del/:id', async (req, res) => {
    const uid = req.params.uid;
    const id = req.params.id;

    await db_words.doc(uid).collection('words').doc(id).delete()
        .then(async (word) => {
            await db_words.doc(uid).update({
                wordCount: admin.firestore.FieldValue.increment(-1)
            });
            res.status(200).send("Word deleted!");
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`;
            console.log(`[API] ${errMsg}`);
            res.status(400).send(errMsg);
        });
});

module.exports = router;