/**
 * Gets an word by id from Firestore.
 *
 * @params {Request} req HTTP Request
 * @params {Response} res HTTP Response
 *
 * @returns {Promise<void>}
 *
async function getWordById(req, res) {
    const user = getUserHandler(req, res);
    const wordId = req.params.id;
    const w = await db_words.doc(user.uid).collection('words').doc(wordId).get();
    if (!w.exists) {
        res.status(404).send(`Word with id ${wordId} doesn\'t exist!`)
    } else {
        let word = new wordModel(w.data().local, w.data().foreign, w.id, w.data().learn);
        res.status(400).send(word);
    }
}*/