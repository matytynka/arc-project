const { firebase } = require('../configs/firebaseConfig');

exports.uploadFileHandler = async function(req, res) {
    await uploadFile(req, res);
}

async function uploadFile(req, res) {
    const file = req.files[0];
    await firebase.storage().ref(`ocr/${file.originalname}`).put(file.buffer)
        .then(() => {
            res.status(200).redirect('back');
        }).catch((error) => {
            let errMsg = `[${error.code}]: ${error.message}`
            console.log(errMsg);
            res.status(400).send(errMsg);
        });
}