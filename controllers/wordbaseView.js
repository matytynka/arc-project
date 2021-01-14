const { getWordListHandler } = require('./word');

exports.getWordbaseViewHandler = async function(req, res) {
    await index(req, res);
}

function index(req, res) {
    getWordListHandler(req, res).then(wordList => {
        res.render('wordbase', {words: wordList});
    })
}