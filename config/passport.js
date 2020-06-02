let passport = require("passport");
let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/user');
let bcrypt = require('bcrypt');

module.exports = () => {
    passport.use(new LocalStrategy({ passReqToCallback: true }, function(req, username, password, done) {
        console.log(username, password)
        User.find(username, (err, user) => {
            console.log(user)
            user = user[0];
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            const hash = user.password;
            bcrypt.compare(password, hash, function(err, res) {
                if (res == true) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });

            // return done(null, user);
        });
    }));


    // These two methods are required to keep the user logged in via the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    return passport;

}