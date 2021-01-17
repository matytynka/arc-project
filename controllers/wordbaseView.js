const { getWordListHandler } = require('./word');

/* Handles wordbase view request */
exports.getWordbaseViewHandler = async function(req, res) { await index(req, res); }

/* Displays wordbase page */
async function index(req, res) {
    /* Checks if user is logged in */
    if(!req.session.isLoggedIn) {
        res.redirect('/');
    } else
    await getWordListHandler(req, res).then(wordList => {
        /* Get user's word list and render wordbase page */
        res.render('wordbase', {words: wordList, loggedIn: req.session.isLoggedIn});
    })
}