const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const words = req.body;
    let filteredWords = [];

    words.forEach((word) => {
        if (!filteredWords.includes(word.toLowerCase())) {
            filteredWords.push(word.toLowerCase());
        }
    });
    res.status(200).send(filteredWords);
});

module.exports = router;