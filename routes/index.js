var express = require('express');
var router = express.Router();

const accountController = require('../controllers/accountController')

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = accountController.get();
  user.then((user) => {
    console.log(user);
    res.render('index', { title: 'Express', user: user})
  });
});

module.exports = router;
