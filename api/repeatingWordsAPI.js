const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const words = req.body;
    let filteredWords = [];
    let forbiddenWords = ["el", "la", "en", "del", "a", "y", "los", "las", "unos", "unas", "uno", "una", "con", "que", "de", "me", "te", "se", "nos", "os", "o"];

    words.forEach((word) => {
        if (!filteredWords.includes(word.toLowerCase()) && !forbiddenWords.includes(word.toLowerCase())) {
            filteredWords.push(word.toLowerCase());
        }
    });
    res.status(200).send(filteredWords);
});

module.exports = router;