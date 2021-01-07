const wordController = require('./wordController');

exports.index = function(req, res, next) {
    const wordListPromise = wordController.getWordList()
    wordListPromise.then(wordList => {
        res.render('wordbase', {words: wordList});
    })
}