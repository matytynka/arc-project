/* Handles set session */
exports.setSessionHandler = async function(req, res) { await setSession(req, res); }

async function setSession(req, res) {
    req.session.isLoggedIn = true;
    req.session.uid = req.body.uid;
    await req.session.save();
    res.send("Logged in!");
}