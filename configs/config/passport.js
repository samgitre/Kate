
var passport = require('passport');
var User = require('../models/user-schema');
var LocalStrategy = require('passport-local').Strategy;



passport.serializeUser(function (user, done) {
    done(null, user.id);
});


passport.deserializeUser(function (id, done) {
    User.fineById(id, function (err, user) {
        done(err, user);
    });


});

passport.use('local-signup',  new LocalStrategy({
    nameField : 'name',
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},

  function (req, name, email, password, done) {
        User.findOne({'email' : email}, function (err, user) {
            if(err){
                return done(err);
            }
            if(user){
                return done(null, false,{message: 'Email is already in use.'});
            }

            var newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.password = new User.encryptPassword(password);
            newUser.save(function (err, result) {
                if(err){
                    return done(err);
                }
                return done(null, newUser);

            })
        });
    }
));
