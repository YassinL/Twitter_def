let express = require('express');
let server = express();
let exphbs = require('express-handlebars');
let session = require('express-session')
let bodyParser = require('body-parser')
let passport = require("./config/passport")();
let User = require('./models/user');

let Handlebars = require("handlebars");
let MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// Moteur de template
server.engine('handlebars', exphbs());
server.set('view engine', 'handlebars');

// Middleware
server.use('/public', express.static('public'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(session({ secret: 'secret', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }))
server.use(passport.initialize());
server.use(passport.session());

// ROUTES
// LOGIN
server.get("/", (request, response) => {
    response.render("login");
});

server.post("/", passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/home'
        // function(request, response) {
        //     let User = require('./models/user');
        //     response.redirect('/home');
        // }
}));

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
        request.body.username,
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