const wordController = require('./wordController');

exports.index = function(req, res, next) {
    const wordListPromise = wordController.getWordList();
    wordListPromise.then((wordList) => {
        res.render('learning', {words: JSON.stringify(wordList)});
    });
}