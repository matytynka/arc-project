const { getUnlearnedWordListHandler } = require('./word');

exports.getIndexViewHandler = async function(req, res) {
    await index(req, res);
}

function index(req, res) {
    getUnlearnedWordListHandler(req, res).then((wordList) => {
        res.render('learning', {words: JSON.stringify(wordList)});
    });
}