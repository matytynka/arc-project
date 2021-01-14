const wordController = require('./wordController');

exports.index = function(req, res, next) {
    const wordListPromise = wordController.getUnlearnedWordList();
    wordListPromise.then((wordList) => {
        res.render('learning', {words: JSON.stringify(wordList)});
    });
}