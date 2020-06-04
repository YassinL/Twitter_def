const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

module.exports = () => {
    passport.use(new LocalStrategy({ passReqToCallback: true }, function(req, username, password, done) {

        User.find(username, (err, user) => {

            user = user[0];
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect Username.' });
            }

            const hash = user.password;
            bcrypt.compare(password, hash, function(err, res) {
                if (res == true) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect Password' });
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