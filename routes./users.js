var express = require('express');
var router = express.Router();
var User = require('../configs/model/user-schema');

/* GET users listing. */
router.get('/all-clients', function(req, res) {
  res.render('users/all-clients', {title : 'Clients Information', layout: 'admin-layout'});
});

router.get('/sign-up', function(req, res) {

    res.render('users/sign-up', {title : 'Users account'});
});


router.get('/login', function(req, res) {

    res.render('users/login', {title : 'Users account'});
});


router.post('/createUser', function(req, res) {
    var user = new User({
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    });
     user.save( function (err) {
         if(err){
             res.status(500).send(err.message);
             return err;
         }
         res.status(200).send('Account created successfully');
     });
});

module.exports = router;
