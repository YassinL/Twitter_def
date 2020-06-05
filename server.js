const express = require('express');
const server = express();
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
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

// Moteur de template
server.engine('handlebars', exphbs());
server.set('view engine', 'handlebars');

// Middleware
server.use('/public', express.static('public'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

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
server.use(flash());
server.use(passport.initialize());
server.use(passport.session());


// ROUTES
// LOGIN
server.get("/", (request, response) => {
    response.render("login", { error: request.flash('error') });
});

// , failureFlash: 'Invalid username or password.'
server.post('/',
    passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
    function(request, response) {
        response.redirect('/home/' + request.user.username);
    });


// SIGNUP
server.get("/signup", (request, response) => {
    response.render("signup", { message: request.flash('info') })
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
        response.redirect('/home/' + request.user.username)
    } else {
        Message.create(request.user.id_user, request.body.message, function() {
            response.redirect('/home/' + request.user.username)
        })
    }
})


// profile username
server.get('/profile/:username', isAuth, (request, response) => {
    let userName = request.params.username
    User.find(userName, function(err, user) {
        Message.one(userName, function(messages) {
            console.log('cest le :', user)
            response.render('profile', {
                message: messages,
                username: userName,
                me: request.user.username,
                picture: user[0].picture,
                firstName: user[0].first_name,
                lastName: user[0].last_name,
                city: user[0].city
            })
        })
    })

})

// LOGOUT
server.get('/logout', (request, response) => {
    request.logout();
    request.session.destroy();
    response.redirect('/');
})

server.listen(8080);