exports.getIndexViewHandler = async function(req, res) {
    await index(req, res);
}

function index(req, res) {
    if(req.session.isLoggedIn) {
        res.redirect('/wordbase');
    } else
    res.render('index', {loggedIn: req.session.isLoggedIn});
}