let express = require('express');
var cookieParser = require('cookie-parser')
let server = express();
let exphbs = require('express-handlebars');
let session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
let bodyParser = require('body-parser');
let passport = require("./config/passport")();
let User = require('./models/user');
let Message = require('./models/message')

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
    // server.use(cookieParser())

// let options = {
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'twitter'
// };

// var sessionStore = new MySQLStore(options);

server.use(session({
    secret: 'secret',
    cookie: { maxAge: null },
    resave: true,
    // store: sessionStore,
    saveUninitialized: true
}))
server.use(passport.initialize());
server.use(passport.session());


function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/')
    }
}



// ROUTES
// LOGIN
server.get("/", (request, response) => {
    response.render("login");
});


server.post('/',
    passport.authenticate('local', { failureRedirect: '/' }),
    function(request, response) {
        response.redirect('/home/' + request.user.username);
    });


// SIGNUP
server.get("/signup", (request, response) => {
    response.render("signup")
})

server.post("/signup", (request, response) => {
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

// HOME AND TWEET
server.get('/home/:username', (request, response) => {
    Message.all(function(messages) {
        response.render('home', { message: messages, username: request.user.username })
    })
})

server.post('/home/:username', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        console.log("Problem !")
        response.redirect('/home/' + request.user.username)
    } else {
        Message.create(request.user.id_user, request.body.message, function() {
            response.redirect('/home/' + request.user.username)
        })
    }
})

// PROFILE
server.get('/profile/:username', (request, response) => {
    let userName = request.params.username
    Message.one(userName, function(messages) {
        console.log('consolelog de params :', request.params.username)
        console.log('console de messages', messages)
        response.render('profile', { message: messages, username: userName })
    })

})

server.listen(8080);