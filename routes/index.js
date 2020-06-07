const express = require('express');
const router = express.Router();

const passport = require("../config/passport")();
const homeRouter = require("./home");
const profileRouter = require("./profile");
const signupRouter = require("./signup");
const logoutRouter = require("./logout");

// On laisse dans l'index les routes à la racine 
// LOGIN
router.get("/", (request, response) => {
    response.render("login", { error: request.flash('error'), title: 'Twitter' });
});

router.post('/',
    passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
    function(request, response) {
        response.redirect('/home/' + request.user.username);
    });

// Appels des différentes routes du dossier routes
router.use(homeRouter);
router.use(profileRouter);
router.use(signupRouter);
router.use(logoutRouter);

module.exports = router;