const { getUnlearnedWordListHandler, learnUpWordHandler, learnDownWordHandler } = require('./word');

/* Handles index view */
exports.getIndexViewHandler = async function(req, res) { await index(req, res); }

function index(req, res) {
    if(!req.session.isLoggedIn) {
        res.redirect('/');
    } else
    getUnlearnedWordListHandler(req, res).then((wordList) => {
        res.render('learning', {words: JSON.stringify(wordList), learnUp: learnUpWordHandler(req, res), learnDown: learnDownWordHandler(req, res), loggedIn: req.session.isLoggedIn});
    });
}