var express = require('express');
var router = express.Router();

// /users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// /users/login
router.post('/login', function(req, res, next) {
	if(req.body.username!="" && req.body.username == req.body.password ){
		req.session.user = req.body.username;
		console.log("req.session.user:"+req.session.user);
		res.send ({result:'success', msg:'login is successful.'});
	}else{
		res.send ({result:'fail', msg:'login failed.'});
	}
});

module.exports = router;
