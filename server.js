const express = require('express');
const cookieParser = require('cookie-parser')
const server = express();
const exphbs = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const passport = require("./config/passport")();
const User = require('./models/user');
const Message = require('./models/message')
const isAuth = require('./middleware/isAuth')

const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);


// app.use(isAuth)

// Moteur de template
server.engine('handlebars', exphbs());
server.set('view engine', 'handlebars');

// Middleware
server.use('/public', express.static('public'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
    // server.use(cookieParser())

let options = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'twitter'
};

var sessionStore = new MySQLStore(options);

server.use(session({
    secret: 'secret',
    cookie: { maxAge: null },
    resave: false,
    store: sessionStore,
    saveUninitialized: false
}))
server.use(passport.initialize());
server.use(passport.session());


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
        request.body.picture,
        function() {

            response.redirect('/')
        })
})

// HOME AND TWEET
server.get('/home/:username', isAuth, (request, response) => {
    Message.all(function(messages) {
        response.render('home', { message: messages, username: request.user.username, picture: request.user.picture })
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
server.get('/profile/:username', isAuth, (request, response) => {
    let userName = request.params.username
    Message.one(userName, function(messages) {
        console.log('consolelog de profil :', request.user.picture)
            // console.log('console de messages', messages)
        response.render('profile', { message: messages, username: userName, picture: request.user.picture })
    })

})

// logout
server.get('/logout', (request, response) => {
    request.logout();
    request.session.destroy();
    response.redirect('/');
})

server.listen(8080);