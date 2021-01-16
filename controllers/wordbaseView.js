const { getWordListHandler } = require('./word');

/* Handle wordbase view request */
exports.getWordbaseViewHandler = async function(req, res) { await index(req, res); }

async function index(req, res) {
    await getWordListHandler(req, res).then(wordList => {
        res.render('wordbase', {words: wordList});
    })
}