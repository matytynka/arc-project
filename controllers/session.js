exports.setSessionHandler = async function(req, res) { await setSession(req, res); }

async function setSession(req, res) {
    console.log(req.body);
    req.session.isLoggedIn = true;
    req.session.uid = req.body.uid;
    console.log(req.session);
    await req.session.save();
}