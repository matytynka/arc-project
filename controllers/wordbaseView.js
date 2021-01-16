const { getWordListHandler } = require('./word');

/* Handle wordbase view request */
exports.getWordbaseViewHandler = async function(req, res) { await index(req, res); }

async function index(req, res) {
    if(!req.session.isLoggedIn) {
        res.redirect('/');
    } else
    await getWordListHandler(req, res).then(wordList => {
        console.log(JSON.stringify(req.session));
        res.render('wordbase', {words: wordList, loggedIn: req.session.isLoggedIn});
    })
}