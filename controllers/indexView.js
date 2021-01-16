exports.getIndexViewHandler = async function(req, res) {
    await index(req, res);
}

function index(req, res) {
    res.render('index', {loggedIn: req.session.loggedIn});
}