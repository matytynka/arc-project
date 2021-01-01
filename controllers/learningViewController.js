const wordController = require('./wordController');

exports.index = function(req, res, next) {
    const wordListPromise = wordController.getWordList();
    wordListPromise.then((wordList) => {
        const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        console.log(randomWord.foreign);
        res.render('learning', {local: randomWord.getLocal, foreign: randomWord.getForeign});
    });
}