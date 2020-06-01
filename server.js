let express = require('express');
let server = express();
let exphbs = require('express-handlebars');
let session = require('express-session')
let bodyParser = require('body-parser')
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;


let Handlebars = require("handlebars");
let MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

let userService = require('./models/findUser')
    // Moteur de template
server.engine('handlebars', exphbs());
server.set('view engine', 'handlebars');

// Momenthandlebars
// MomentHandler.registerHelpers(exphbs);

// Middleware
server.use('/public', express.static('public'))
server.use(session({ secret: 'secret', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(passport.initialize());
server.use(passport.session());

// MIDDLEWARE AUTHENTIFICATION

passport.use(new LocalStrategy({ passReqToCallback: true }, function(req, user_name, password, done) {
    console.log(user_name, password)
    userService.find(user_name, (err, user) => {
        console.log(user)
        user = user[0];
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}));

// ROUTES
// LOGIN
server.get("/", (request, response) => {
    response.render("login");
});

// server.post("/", (request, response) => {
//     response.redirect("home")
// })

server.post("/", passport.authenticate('local', {
        failureRedirect: '/',
    }), (request, response) => {
        response.redirect('/home')
    })
    // + request.user.user_name

// SIGNUP
server.get("/signup", (request, response) => {
    response.render("signup")
})

server.post("/signup", (request, response) => {
    let User = require('./models/user')
    User.create(
        request.body.first_name,
        request.body.last_name,
        request.body.birthday,
        request.body.city,
        request.body.email,
        request.body.telephone,
        request.body.user_name,
        request.body.password,
        function() {

            response.redirect('/')
        })
})

// CREE ET RECUPERE LES TWEETS
server.get('/home', (request, response) => {
    let Message = require('./models/message')
    Message.all(function(messages) {
        response.render('home', { message: messages })
    })
})

server.post('/home', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        console.log("Problem !")
        response.redirect('/home')
    } else {
        let Message = require('./models/message')
        Message.create(request.body.message, function() {
            response.redirect('/home')
        })
    }
})


server.listen(8080);